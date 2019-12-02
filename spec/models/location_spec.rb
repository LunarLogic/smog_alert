require 'rails_helper'

RSpec.describe Location, type: :model do
  describe 'validations' do
    # Here we're using FactoryBot, but you could use anything
    subject { build(:location) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:longitude) }
    it { should validate_presence_of(:latitude) }
  end
end
