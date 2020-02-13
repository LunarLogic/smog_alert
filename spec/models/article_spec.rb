require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:article) }
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:body) }
    it { should validate_presence_of(:overview) }
  end
end
