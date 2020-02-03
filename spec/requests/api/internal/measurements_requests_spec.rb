require 'rails_helper'

describe '/api/internal/measurements' do
  let(:location) { FactoryBot.create(:location_with_measurements) }
  let(:measurement) { location.measurements.last }

  describe 'GET /calendar_values' do
    it 'repsonds with json containing the right data' do
      expected_response = {
        'year' => measurement.date.year,
        'daily_average_measurements' => [
          {
            'day' => measurement.date.to_s,
            'pm10' => measurement.pm10.to_s,
            'pm25' => measurement.pm25.to_s,
            'number_of_measurements' => 10
          },
        ]
      }
      location_id = location.id
      year = location.measurements.last.date.year
      get calendar_values_api_internal_measurements_path(location_id: location_id, year: year)
      json = JSON.parse(response.body)
      expect(json).to eq(expected_response)
    end

    it 'responds with 422 status when missing params' do
      location_id = location.id
      get calendar_values_api_internal_measurements_path(location_id: location_id)
      expect(response.status).to eq(422)
      expect(response.body).to be_json_eql({ 'errors' => [{ 'year' => ['parameter is required'] }] }.to_json)
    end
  end

  describe 'GET /calendar_status' do
    it 'repsonds with json containing the right data' do
      expected_response = { 'data' =>
        {
          '2019' => [
            {
              'days' => ['2019-11-27'],
              'status' => 'zbyt mało danych',
            },
          ]
        } }
      location_id = location.id
      year = location.measurements.last.date.year
      get calendar_status_api_internal_measurements_path(location_id: location_id, year: year)
      json = JSON.parse(response.body)
      expect(json).to eq(expected_response)
    end
  end

  describe 'GET /hourly_average_for_month' do
    context 'when database contains data for the given date and location' do
      let!(:location_a) { FactoryBot.create(:location) }
      let!(:location_b) { FactoryBot.create(:location) }

      before do
        hours = 0..23
        hours.each do |hour|
          FactoryBot.create(:measurement, location: location_a, till_date_time: "2019-11-27 #{hour}:20:15")
          FactoryBot
            .create(:measurement, location: location_a, till_date_time: "2019-11-27 #{hour}:50:15", pm10: 5, pm25: 5)
          FactoryBot
            .create(:measurement, location: location_b, till_date_time: "2019-11-27 #{hour}:20:15", pm10: 5, pm25: 5)
        end
        location_id = location_a.id
        date = '2019-11-01 00:00:00'
        get hourly_average_for_month_api_internal_measurements_path(location_id: location_id, date: date)
      end

      it 'returns json with average pollution per hour' do
        expect(response.body).to have_json_path('data')
        expect(response.body).to have_json_size(24).at_path('data/average_pollution_by_hour')
        expect(response.body).to be_json_eql(3.25).at_path('data/average_pollution_by_hour/0/0/average_pm10')
      end
    end
  end
end
