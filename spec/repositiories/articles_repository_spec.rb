require 'rails_helper'

RSpec.describe ArticlesRepository do
  let(:articles_repository) { ArticlesRepository.new }
  let(:user) { FactoryBot.create(:user) }
  describe '#make_published' do
    it 'changes publish and published_at params to be true' do
      article = FactoryBot.create(:article, published: false, published_at: nil, user: user)
      articles_repository.make_published(article)
      expect(article.published).to be true
      expect(article.published_at).not_to be nil
    end
  end

  describe '#make_unpublished' do
    it 'changes publish and published_at params to be false' do
      article = FactoryBot.create(:article, published: true, published_at: Time.current, user: user)
      articles_repository.make_unpublished(article)
      expect(article.published).to be false
      expect(article.published_at).to be nil
    end
  end

  describe '#published_articles_with_tag' do
    it 'returns published article that have tag with a given name' do
      tag = FactoryBot.create(:tag)
      article = FactoryBot.create(:article, published: true, published_at: Time.current, user: user, tags: [tag])
      response = subject.published_articles_with_tag(tag.name)
      expected_response = [article]
      expect(response).to eq(expected_response)
    end

    it 'doesn\'t return published article that doesn\'t have tag with a given name' do
      tag = FactoryBot.create(:tag)
      FactoryBot.create(:article, published: true, published_at: Time.current, user: user)
      response = subject.published_articles_with_tag(tag.name)
      expected_response = []
      expect(response).to eq(expected_response)
    end
  end
end
