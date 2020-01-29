require 'rails_helper'

RSpec.describe Organization, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:organization) }
    it { should validate_presence_of(:organization_name) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:email) }
    it { should allow_value('https://www.facebook.com/').for(:facebook) }
    it { should_not allow_value('facebook.com').for(:facebook) }
  end
end
