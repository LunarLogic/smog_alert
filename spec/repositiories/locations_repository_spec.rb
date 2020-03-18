require 'rails_helper'

RSpec.describe LocationsRepository do
  let!(:location1) {FactoryBot.create(:location)}
  let!(:location2) {FactoryBot.create(:location)}
  let!(:location3) {FactoryBot.create(:location)}

  describe '#locations_with_last_hour_measurement' do
    it 'returns locations that don\'t have measurement from last hour' do
      freeze_time do
        measurement = FactoryBot.create(:measurement, location_id: location3.id, till_date_time: 1.hour.ago)
        response = subject.locations_with_last_hour_measurement
        expect(response).to include(location1)
        expect(response).to include(location2)
        expect(response).to include(location3)
        expect(response[0].measurements.empty?).to eq true
        expect(response[1].measurements.empty?).to eq true
        expect(response[2].measurements.count).to eq(1)
        expect(response[2].measurements.first).to eq(measurement)
      end
    end
  end

  describe '#locations_without_last_hour_measurement' do
    it 'returns locations that don\'t have measurement from last hour' do
      freeze_time do
        FactoryBot.create(:measurement, location_id: location3.id, till_date_time: 1.hour.ago)
        response = subject.locations_without_last_hour_measurement
        expect(response).to include(location1)
        expect(response).to include(location2)
        expect(response).not_to include(location3)
      end
    end
  end
end
