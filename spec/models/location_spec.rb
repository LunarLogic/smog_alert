require 'rails_helper'

RSpec.describe Location, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:location) }
    it { should validate_presence_of(:longitude) }
    it { should validate_presence_of(:latitude) }
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).scoped_to(:street) }
  end
end
