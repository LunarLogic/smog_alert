require 'rails_helper'

RSpec.describe Organization, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:organization) }
    it { should validate_presence_of(:organization_name) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:email) }
  end
end
