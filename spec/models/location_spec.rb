require 'rails_helper'

RSpec.describe Location, type: :model do
  describe 'validations' do
    subject { FactoryBot.create(:location) }
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:longitude) }
    it { should validate_presence_of(:latitude) }
    it { should validate_presence_of(:name) }
  end
  
  describe '#last_hour_measurement' do
    subject { location.last_hour_measurement }

    context 'when database contains measurement for the given location fom the last hour' do
      let!(:location) { FactoryBot.create(:location) }
      let!(:measurement_old) { FactoryBot.create(:measurement, location: location, till_date_time: (Time.now - 1.hour - 1.second)) }
      let!(:measurement_newest) { FactoryBot.create(:measurement, location: location, till_date_time: (Time.now - 15.minutes)) }
      let!(:measurement_mid) { FactoryBot.create(:measurement, location: location, till_date_time: (Time.now - 20.minutes)) }
      
      it 'returns last measurement for the given requirements' do
        expect(subject).to eql measurement_newest
      end
    end

    # context 'when there is no measurement for the given location form the last hour' do
    #   let!(:location_b) { FactoryBot.create(:location) }
    #   let!(:measurement_a_old) { FactoryBot.create(:measurement, location: location_a) }
    #   let!(:measurements_a_new) { FactoryBot.create(:measurement, location: location_a, pm10: 1.2) }
    #   let!(:measurements_b_new) { FactoryBot.create(:measurement, location: location_b) }

    # end
  end
end
