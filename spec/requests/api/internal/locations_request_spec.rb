require 'rails_helper'

describe '/api/internal/locations' do
  describe 'GET /no_current_measurements' do
    it 'repsonds with json containing the right data' do
      location1 = FactoryBot.create(:location)
      location2 = FactoryBot.create(:location)
      location3 = FactoryBot.create(:location)
      FactoryBot.create(:measurement, location_id: location3.id, till_date_time: 5.minutes.ago)
      expected_response = [location1, location2].to_json
      get no_current_measurements_api_internal_locations_path
      expect(response.body).to be_json_eql(expected_response)
    end
  end
end
