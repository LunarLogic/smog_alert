require 'rails_helper'

describe ArticleTagsRepository do
  let!(:user) { FactoryBot.create(:superadmin) }
  let!(:article) { FactoryBot.create(:article, user_id: user.id) }
  let!(:article2) { FactoryBot.create(:article, user_id: user.id) }

  it 'creates new tags' do
    tags_names = %w[tag2 tag3 tag4]
    ArticleTagsRepository.new.create_new_tags(article, tags_names)
  end

  it 'doesn\'t create a new tag if a tag is already in the db' do
    Tag.create(name: 'tag1')
    tags_names = ['tag1']
    ArticleTagsRepository.new.create_new_tags(article, tags_names)
    expect(Tag.all.count).to eq(1)
  end

  it 'doesn\'t create tags when empty tags names given' do
    tags_names = ['']
    ArticleTagsRepository.new.create_new_tags(article, tags_names)
    expect(Tag.all.count).to eq(0)
  end

  it 'deletes tagging when one of more tags was deleted' do
    article.tags.create(name: 'tag1')
    article.tags.create(name: 'tag2')
    expect(Tagging.all.count).to eq(2)
    tags_names = ['tag2']
    ArticleTagsRepository.new.update_article_tags(article, tags_names)
    article.reload
    expect(article.tags.count).to eq(1)
    expect(article.tags.first.name).to eq('tag2')
  end

  it 'deletes tags when they don\'t have any taggings' do
    ArticleTagsRepository.new.create_new_tags(article, ['tag1'])
    expect(Tagging.all.count).to eq(1)
    tags_names = []
    ArticleTagsRepository.new.update_article_tags(article, tags_names)
    expect(Tag.all.count).to eq(0)
  end

  it 'doesn\'t delete tag from db if it has other taggings' do
    ArticleTagsRepository.new.create_new_tags(article, ['tag1'])
    ArticleTagsRepository.new.create_new_tags(article2, ['tag1'])
    expect(Tagging.all.count).to eq(2)
    expect(Tag.all.count).to eq(1)
    tags_names = []
    ArticleTagsRepository.new.update_article_tags(article, tags_names)
    expect(Tag.all.count).to eq(1)
  end

  it 'deletes relation with a tag if it\'s name was changed and adds a new tag' do
    ArticleTagsRepository.new.create_new_tags(article, ['tag1'])
    tags_names = ['tag3']
    ArticleTagsRepository.new.update_article_tags(article, tags_names)
    article.reload
    expect(article.tags.pluck(:name)).to eq(['tag3'])
  end
end
