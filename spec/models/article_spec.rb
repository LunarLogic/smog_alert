require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:article) }
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:body) }
  end

  describe '#make_published' do
    it 'changes publish and published_at params' do
      article = FactoryBot.create(:article, published: false, published_at: nil)
      article.make_published
      expect(article.published).to be true
      expect(article.published_at).not_to be nil
    end
  end
end
