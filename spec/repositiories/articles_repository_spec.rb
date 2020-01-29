require 'rails_helper'

RSpec.describe ArticlesRepository do
  let(:articles_repository) { ArticlesRepository.new }

  describe '#make_published' do
    it 'changes publish and published_at params to be true' do
      article = FactoryBot.create(:article, published: false, published_at: nil)
      articles_repository.make_published(article)
      expect(article.published).to be true
      expect(article.published_at).not_to be nil
    end
  end

  describe '#make_unpublished' do
    it 'changes publish and published_at params to be false' do
      article = FactoryBot.create(:article, published: true, published_at: Time.current)
      articles_repository.make_unpublished(article)
      expect(article.published).to be false
      expect(article.published_at).to be nil
    end
  end
end
