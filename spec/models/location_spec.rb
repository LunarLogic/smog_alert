require 'rails_helper'

RSpec.describe Location, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:location) }
    it { should validate_presence_of(:longitude) }
    it { should validate_presence_of(:latitude) }
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).scoped_to(:street) }
    it { should validate_presence_of(:installation_id) }
    it { should validate_uniqueness_of(:installation_id) }
  end

  describe '#last_hour_measurement' do
    let(:location) { FactoryBot.create(:location) }
    it 'returns a the most recent measurement from past hour' do
      FactoryBot.create(:measurement, till_date_time: 5.minutes.ago, location: location)
      measurement = FactoryBot.create(:measurement, till_date_time: Time.current, location: location)
      expect(location.last_hour_measurement).to eq(measurement)
    end

    it 'returns nil if location doesn\'t have measurement from past hour' do
      expect(location.last_hour_measurement).to eq(nil)
    end
  end
end
