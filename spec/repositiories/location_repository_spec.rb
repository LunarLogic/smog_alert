require 'rails_helper'

RSpec.describe LocationsRepository do
  let(:locations_repository) { LocationsRepository.new }

  describe '#last_hour_measurement' do
    let!(:location) { FactoryBot.create(:location) }
    let!(:other_location) { FactoryBot.create(:location) }

    subject { locations_repository.last_hour_measurement(location) }

    context 'when database contains measurement for the given location fom the last hour' do
      let!(:measurement_old) do
        FactoryBot.create(:measurement, location: location, till_date_time: (Time.current - 1.hour - 1.second))
      end
      let!(:measurement_newest) do
        FactoryBot.create(:measurement, location: location, till_date_time: (Time.current - 15.minutes))
      end
      let!(:measurement_other_location) do
        FactoryBot.create(:measurement, location: other_location, till_date_time: (Time.current - 10.minutes))
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

  describe '#last_hour_measurements_by_location_name' do
    let!(:location_zabierzow_1) { FactoryBot.create(:location, name: 'Zabierzów', street: 'stret 1') }
    let!(:location_zabierzow_2) { FactoryBot.create(:location, name: 'Zabierzów', street: 'street 2') }
    let!(:other_location) { FactoryBot.create(:location) }
    let(:location_name) { 'Zabierzów' }

    subject { locations_repository.last_hour_measurements_by_location_name(location_name) }

    context 'when both Zabierzów locations have last hour measurement' do
      it do
        measurement_1 = double
        measurement_2 = double
        expect(locations_repository).to receive(:last_hour_measurement).with(location_zabierzow_1).and_return(measurement_1)
        expect(locations_repository).to receive(:last_hour_measurement).with(location_zabierzow_2).and_return(measurement_2)

        expect(subject).to match_array([measurement_1, measurement_2])
      end
    end

    context 'when only one of Zabierzów locations have last hour measurement' do
      it do
        measurement_1 = double
        measurement_2 = nil
        expect(locations_repository).to receive(:last_hour_measurement).with(location_zabierzow_1).and_return(measurement_1)
        expect(locations_repository).to receive(:last_hour_measurement).with(location_zabierzow_2).and_return(measurement_2)

        expect(subject).to match_array([measurement_1])
      end
    end

    context 'when fake Zabierzów locations' do
      let(:location_name) { 'Fake Zabierzów' }

      it do
        expect(subject).to match_array([])
      end
    end
  end
end
