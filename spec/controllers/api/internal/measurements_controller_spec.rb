require 'rails_helper'

RSpec.describe API::Internal::MeasurementsController, type: :controller do
  describe 'GET/ #current' do

    context 'when database contains various measurements for any given location' do
      let!(:location_a) { FactoryBot.create(:location) }
      let!(:location_b) { FactoryBot.create(:location) }
      let!(:measurement_a_old) { FactoryBot.create(:measurement, location: location_a) }
      let!(:measurements_a_new) { FactoryBot.create(:measurement, location: location_a, pm10: 1.2) }
      let!(:measurements_b_new) { FactoryBot.create(:measurement, location: location_b) }

      before do
        get :current
      end

      it 'returns last measurement for the given location' do
        expect(JSON.parse(response.body)).to include(location_id: location_a.id)
      end
      # it 'gives a json response with correct number of attributes' do
      #   measurements = FactoryBot.create(:measurement)
      #   current_measurements = FactoryBot.create(:measurement, pm10: 1.2, location: 'Zabierzow')
      #   expect(JSON.parse(response.body).size).to eq(11)
      # end

      # it 'returns status code 200' do
      #   expect(response).to have_http_status(:success)
      # end
    end

    context 'when there are no measurements for the last hour for any location' do
      let!(:now) { Time.zone.local(2019, 11, 27, 18, 20, 16) }
      let!(:location_a) { FactoryBot.create(:location) }
      let!(:location_b) { FactoryBot.create(:location) }
      let(:measurement_a_old) { FactoryBot.create(:measurement, location: location_a, till_date_time: (now - 1.hour - 1.second)) }
      let!(:measurements_b_new) { FactoryBot.create(:measurement, location: location_b) }

      before do
        travel_to(now)
        get :current
      end

      it 'returns no measurement for location a' do
        puts response.body
        expect(response.body).to have_json_path('data')
        expect(response.body).to have_json_size(2).at_path('data')
        expect(response.body).to have_json_path('data/0/location_name')
        expect(response.body).to be_json_eql({ location_name: location_a.name }.to_json).at_path('data/0')
      end
    end
  end
end
