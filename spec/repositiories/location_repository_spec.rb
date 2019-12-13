require 'rails_helper'

RSpec.describe LocationsRepository do
  describe '#last_hour_measurement' do
    let(:location_repository) { LocationsRepository.new }
    let!(:location) { FactoryBot.create(:location) }

    subject { location_repository.last_hour_measurement(location) }

    context 'when database contains measurement for the given location fom the last hour' do
      let!(:measurement_old) do
        FactoryBot.create(:measurement, location: location, till_date_time: (Time.current - 1.hour - 1.second))
      end
      let!(:measurement_newest) do
        FactoryBot.create(:measurement, location: location, till_date_time: (Time.current - 15.minutes))
      end
      let!(:measurement_mid) do
        FactoryBot.create(:measurement, location: location, till_date_time: (Time.current - 20.minutes))
      end

      it 'returns last measurement for the given requirements' do
        expect(subject).to eql measurement_newest
      end
    end

    context 'when there is no measurement for the given location form the last hour' do
      let!(:measurement_old) do
        FactoryBot.create(:measurement, location: location, till_date_time: (Time.current - 1.hour - 1.second))
      end

      it 'returns nil' do
        expect(subject).to eql nil
      end
    end
  end
end
