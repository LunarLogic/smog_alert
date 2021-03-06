require 'rails_helper'

describe '/api/internal/measurements' do
  let(:location) { FactoryBot.create(:location_with_measurements) }
  let(:measurement) { location.measurements.last }

  describe 'GET /calendar_status' do
    it 'repsonds with json containing the right data' do
      measurement = FactoryBot.create(:measurement, till_date_time: Time.current, location: location)
      expected_response = {
        data: [
          {
            location_id: location.id,
            location_name: location.name,
            location_street: location.street,
            location_display_name: location.name,
            lat: location.latitude,
            lng: location.longitude,
            status_of_locations_grouped_by_name: 'doskonały',
            last_hour_measurement:
            {
              from_date_time: measurement.from_date_time,
              till_date_time: measurement.till_date_time,
              values: [
                { name: 'PM 10', value: measurement.pm10 },
                { name: 'PM 2.5', value: measurement.pm25 },
              ],
              status: 'doskonały',
              advice: measurement.advice
            },
          },
        ]
      }.to_json
      get current_api_internal_measurements_path
      expect(response.body).to be_json_eql(expected_response)
    end
  end

  describe 'GET /calendar_values' do
    it 'repsonds with json containing the right data' do
      expected_response = {
        'year' => measurement.date.year,
        'daily_average_measurements' => [
          {
            'date' => '2019-11-27',
            'number_of_measurements' => 10,
            'average_values' => [
              {
                'name' => 'PM 10',
                'value' => measurement.pm10.to_s,
              },
              {
                'name' => 'PM 2.5',
                'value' => measurement.pm25.to_s,
              },
            ],
            'status' => 'zbyt mało danych'
          },
        ]
      }.to_json
      location_id = location.id
      year = location.measurements.last.date.year
      get calendar_values_api_internal_measurements_path(location_id: location_id, year: year)
      expect(response.body).to be_json_eql(expected_response)
    end

    it 'responds with 422 status when missing params' do
      location_id = location.id
      get calendar_values_api_internal_measurements_path(location_id: location_id)
      expect(response.status).to eq(422)
      expect(response.body).to be_json_eql({
        'data' => nil,
        'errors' => [{ 'year' => ['parameter is required'] }]
      }.to_json)
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

  describe 'GET /calendar_daily_values' do
    it 'repsonds with json containing the right data' do
      expected_response =
        {
          'date' => '2019-11-27',
          'number_of_measurements' => 10,
          'average_values' => [
            {
              'name' => 'PM 10',
              'value' => measurement.pm10.to_s,
            },
            {
              'name' => 'PM 2.5',
              'value' => measurement.pm25.to_s,
            },
          ],
          'status' => 'zbyt mało danych'
        }
      location_id = location.id
      date = measurement.date
      get calendar_daily_values_api_internal_measurements_path(location_id: location_id, date: date)
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
        expect(response.body).to have_json_size(24).at_path('data/average_pollution_by_hour/average_pm10')
        expect(response.body).to be_json_eql(3.25).at_path('data/average_pollution_by_hour/average_pm10/0/value')
        expect(response.body).to be_json_eql('doskonały'.to_json)
          .at_path('data/average_pollution_by_hour/average_pm25/13/status')
      end
    end
  end
end
