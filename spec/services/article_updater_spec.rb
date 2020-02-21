require 'rails_helper'

RSpec.describe ArticleUpdater do
  let(:article) { FactoryBot.create(:article) }
  let(:params) { { article: { title: article.title, body: article.body }, id: article.id } }

  it 'deletes tagging when one of more tags was deleted' do
    tag1 = article.tags.create(name: 'tag1')
    article.tags.create(name: 'tag2')
    expect(Tagging.all.count).to eq(2)
    params[:article][:tags_attributes] = [{ name: tag1.name, id: tag1.id }]
    ArticleUpdater.new.call(params)
    expect(article.tags.count).to eq(1)
    expect(article.tags.first.name).to eq('tag1')
  end

  it 'deletes tagging when all tags were' do
    article.tags.create(name: 'tag1')
    expect(Tagging.all.count).to eq(1)
    ArticleUpdater.new.call(params)
    expect(article.tags.count).to eq(0)
  end

  it 'deletes tags when they don\'t have any taggings' do
    article.tags.create(name: 'tag1')
    expect(Tagging.all.count).to eq(1)
    ArticleUpdater.new.call(params)
    expect(Tag.all.count).to eq(0)
  end

  context 'manage editing tags' do
    it 'deletes relation with a tag if it\'s name was changed' do
      tag1 = article.tags.create(name: 'tag1')
      params[:article][:tags_attributes] = [{ name: 'tag3', id: tag1.id }]
      ArticleUpdater.new.call(params)
      article.reload
      expect(article.tags.last.name).to eq('tag3')
      expect(article.tags.all).to_not include(tag1)
    end
  end

  it 'updates article\'s title and body' do
    params[:article][:title] = 'New title'
    params[:article][:body] = 'New body'
    ArticleUpdater.new.call(params)
    article.reload
    expect(article.title).to eq('New title')
    expect(article.body.to_s).to include('New body')
  end
end
