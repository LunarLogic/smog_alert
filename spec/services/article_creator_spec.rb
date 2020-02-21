require 'rails_helper'

describe ArticleCreator do
  let!(:superadmin) { create(:superadmin) }
  let(:params) { { title: 'New article', body: 'Body', overview: 'Overview' } }

  it 'creates new article' do
    ArticleCreator.new.call(user_id: superadmin.id, params: params)
    expect(Article.last.title).to eq('New article')
    expect(Article.last.overview).to eq('Overview')
    expect(Article.last.user_id).to eq(superadmin.id)
  end

  it 'creates new article with tags' do
    params[:tags_attributes] = [{ name: 'tag1' }, { name: '0' }, { name: 'tag1' }, { name: '' }]
    ArticleCreator.new.call(user_id: superadmin.id, params: params)
    expect(Article.last.tags.count).to eq(2)
  end

  it 'doesn\'t create tags when empty tags names given' do
    params[:tags_attributes] = [{ name: '' }]
    ArticleCreator.new.call(user_id: superadmin.id, params: params)
    expect(Article.last.tags.count).to eq(0)
  end

  it 'doesn\'t create a new tag if a tag is already in the db' do
    tag1 = Tag.create(name: 'tag1')
    params[:tags_attributes] = [{ name: tag1.name }]
    ArticleCreator.new.call(user_id: superadmin.id, params: params)
    expect(Tag.all.count).to eq(1)
  end

  it 'returns false when validations don\'t pass' do
    params[:title] = ''
    expect(ArticleCreator.new.call(user_id: superadmin.id, params: params)). to eq(false)
  end
end
