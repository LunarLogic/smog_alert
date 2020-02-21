require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'validations' do
    let(:user) { FactoryBot.create(:user) }

    subject { FactoryBot.create(:article, user: user) }

    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:body) }
    it { should validate_presence_of(:overview) }
    it { should belong_to(:user) }
  end
end
