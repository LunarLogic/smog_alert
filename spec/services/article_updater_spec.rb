require 'rails_helper'

RSpec.describe ArticleUpdater do
  let(:article) { FactoryBot.create(:article) }
  let(:params) { { title: article.title, body: article.body } }

  it 'deletes tagging when one of more tags was deleted' do
    tag1 = article.tags.create(name: 'tag1')
    article.tags.create(name: 'tag2')
    expect(Tagging.all.count).to eq(2)
    params[:tags_attributes] = [{ name: tag1, id: tag1.id }]
    ArticleUpdater.new(article).call(params)
    expect(article.tags.count).to eq(1)
    expect(article.tags.first.name).to eq('tag1')
  end

  it 'deletes tagging when all tags were' do
    article.tags.create(name: 'tag1')
    expect(Tagging.all.count).to eq(1)
    ArticleUpdater.new(article).call(params)
    expect(article.tags.count).to eq(0)
  end

  it 'deletes tags when they don\'t have any taggings' do
    article.tags.create(name: 'tag1')
    expect(Tagging.all.count).to eq(1)
    ArticleUpdater.new(article).call(params)
    expect(Tag.all.count).to eq(0)
  end

  it 'updates article\'s title and body' do
    params[:title] = 'New title'
    params[:body] = 'New body'
    ArticleUpdater.new(article).call(params)
    expect(article.title).to eq('New title')
    expect(article.body.to_s).to include('New body')
  end
end
