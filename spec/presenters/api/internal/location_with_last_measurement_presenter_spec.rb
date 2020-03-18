require 'rails_helper'

RSpec.describe API::Internal::LocationWithLastMeasurementPresenter do
  let(:location) { FactoryBot.create(:location) }

  it 'it returns a hash with last hour measurement' do
    measurement = FactoryBot.create(:measurement, till_date_time: Time.current, location: location)
    expected_response = {
      location_id: location.id,
      location_name: location.name,
      location_street: location.street,
      location_display_name: location.name,
      lat: location.latitude,
      lng: location.longitude,
      status_of_locations_grouped_by_name: 'bardzo dobry',
      last_hour_measurement:
      {
        from_date_time: measurement.from_date_time,
        till_date_time: measurement.till_date_time,
        values: [
          { name: 'PM 10', value: measurement.pm10 },
          { name: 'PM 2.5', value: measurement.pm25 },
        ],
        status: 'bardzo dobry',
        advice: measurement.advice
      },
    }
    expect(described_class.new(location, measurement, [measurement]).to_hash).to eq(expected_response)
  end

  context 'when no last hour measurement' do
    it 'it returns array with hash with nil as last hour measurement' do
      expected_response = {
        location_id: location.id,
        location_name: location.name,
        location_street: location.street,
        location_display_name: location.name,
        lat: location.latitude,
        lng: location.longitude,
        status_of_locations_grouped_by_name: nil,
        last_hour_measurement: nil,
      }
      expect(described_class.new(location, nil, []).to_hash).to eq(expected_response)
    end
  end
end
