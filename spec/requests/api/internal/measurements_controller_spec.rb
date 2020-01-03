require 'rails_helper'

describe '/api/internal/measurements' do
  let(:location) { FactoryBot.create(:location) }

  let(:measurement) { location.measurements.create(FactoryBot.attributes_for(:measurement)) }

  describe 'get /calendar_values' do
    it 'repsonds with json containing the right data' do
      expected_response = {
        'year' => measurement.date.year,
        'daily_average_measurements' => [
          {
            'day' => measurement.date.to_s,
            'pm10' => measurement.pm10.to_s,
            'pm25' => measurement.pm25.to_s,
            'number_of_measurements' => 1
          },
        ]
      }
      location_id = location.id
      year = location.measurements.last.date.year
      get calendar_values_api_internal_measurements_path(location_id: location_id, year: year)
      json = JSON.parse(response.body)
      expect(json).to eq(expected_response)
    end
  end

  describe '/calendar_status' do
    it 'repsonds with json containing the right data' do
      expected_response = {
        '2019' => {
          'zbyt mało danych' => [
            measurement.date.to_s,
          ]
        }
      }
      location_id = location.id
      year = location.measurements.last.date.year
      get calendar_status_api_internal_measurements_path(location_id: location_id, year: year)
      json = JSON.parse(response.body)
      expect(json).to eq(expected_response)
    end
  end
end
