require 'rails_helper'

RSpec.describe API::Internal::MeasurementsController, type: :controller do
  describe 'GET/ #current' do
    before do
      let
      location_a = FactoryBot.create(:location)
      location_b = FactoryBot.create(:location)
        measurements_a_old = FactoryBot.create(:measurement, location: location_a)
        measurements_a_new = FactoryBot.create(:measurement, location: location_a, pm10: 1.2)
        measurements_b_new = FactoryBot.create(:measurement, location: location_b)
      get :current
    end

    context 'when database contains various measurements for any given location' do
      it 'returns last measurement for the given location' do
        expect(JSON.parse(response.body)).to include(location: location_a)
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

    context 'when there are no measurements for requested localization' do
      
    end

    context 'when requested localization does not exist in the database' do
      
    end
  end
end
