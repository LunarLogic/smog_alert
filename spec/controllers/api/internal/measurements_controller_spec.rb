require 'rails_helper'

RSpec.describe API::Internal::MeasurementsController, type: :controller do
  describe 'GET/ #current' do

    context 'when database contains various measurements for any given location' do
      let!(:location_a) { FactoryBot.create(:location) }
      let!(:location_b) { FactoryBot.create(:location) }
      let!(:measurement_a_old) { FactoryBot.create(:measurement, location: location_a, till_date_time: (Time.current - 1.hour - 1.second)) }
      let!(:measurements_a_new) { FactoryBot.create(:measurement, location: location_a, till_date_time: (Time.current - 20.minutes)) }
      let!(:measurements_b_new) { FactoryBot.create(:measurement, location: location_b, till_date_time: (Time.current - 20.minutes)) }

      before do
        get :current
      end

      it 'returns last measurement for the given location' do
        expect(response.body).to be_json_eql(location_a.id.to_json).at_path('data/0/location_id')
        expect(response.body).to be_json_eql(location_b.id.to_json).at_path('data/1/location_id')
        expect(response.body).to be_json_eql(measurements_a_new.till_date_time.to_json).at_path('data/0/last_hour_measurement/till_date_time')
      end
    end

    context 'when there are no measurements for the last hour for any location' do
      let!(:location_a) { FactoryBot.create(:location) }
      let!(:location_b) { FactoryBot.create(:location) }
      let!(:measurement_a_old) { FactoryBot.create(:measurement, location: location_a, till_date_time: (Time.current - 1.hour - 1.second)) }
      let!(:measurements_b_new) { FactoryBot.create(:measurement, location: location_b, till_date_time: (Time.current - 20.minutes)) }

      before do
        get :current
      end

      it 'returns no measurement for location a' do
        puts response.body
        expect(response.body).to have_json_path('data')
        expect(response.body).to have_json_size(2).at_path('data')
        expect(response.body).to have_json_path('data/0/location_name')
        expect(response.body).to be_json_eql(location_a.name.to_json).at_path('data/0/location_name')
      end
    end
  end
end
