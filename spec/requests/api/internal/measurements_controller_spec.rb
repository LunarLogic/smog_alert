require 'rails_helper'



describe '/api/internal/measurements/calendar_values' do
  let(:location) { FactoryBot.create(:location) }

  it 'repsonds with json containing the right data' do
    location.measurements.create(FactoryBot.attributes_for(:measurement))
    location_id = location.id
    year = location.measurements.last.date.year
    get calendar_values_api_internal_measurements_path(location_id: location_id, year: year)
    json = JSON.parse(response.body)
    expected_response = {
      "year" => 2019,
      "daily_average_measurements" => [
        {
          "day" => "2019-11-27",
          "pm10" => "1.5",
          "pm25" => "1.5",
          "number_of_measurements" => 1
        }
      ]
    }
    expect(json).to eq(expected_response)
  end
end
