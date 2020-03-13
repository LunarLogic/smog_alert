require 'rails_helper'

RSpec.describe LastHourMeasurementsAssigner do
  let(:location) { FactoryBot.create(:location) }
  let(:location_2) { FactoryBot.create(:location) }

  it 'it returns array with hash with last hour measurement' do
    measurement = FactoryBot.create(:measurement, till_date_time: Time.current, location: location)
    expected_response = [
      {
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
      },
      {
        location_id: location_2.id,
        location_name: location_2.name,
        location_street: location_2.street,
        location_display_name: location_2.name,
        lat: location_2.latitude,
        lng: location_2.longitude,
        status_of_locations_grouped_by_name: nil,
        last_hour_measurement: nil
      },
    ]
    expect(subject.call([location, location_2])).to eq(expected_response)
  end
end
