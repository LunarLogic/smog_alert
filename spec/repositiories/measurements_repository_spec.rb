require 'rails_helper'

RSpec.describe MeasurementsRepository do
  describe '#monthly_measurements' do
    let(:measurements_repository) { MeasurementsRepository.new }
    let!(:location_a) { FactoryBot.create(:location) }
    let!(:location_b) { FactoryBot.create(:location) }

    subject { measurements_repository.monthly_measurements(location_a, Time.current.at_beginning_of_month) }

    context 'when database contains measurements from the given month for the given location' do
      let!(:right_measurement_first) do
        FactoryBot.create(:measurement, location: location_a, from_date_time: (Time.current
          .at_end_of_month - 1.hour), till_date_time: (Time.current.at_end_of_month - 1.second))
      end
      let!(:right_measurement_second) do
        FactoryBot.create(:measurement, location: location_a, from_date_time: (Time.current
          .at_beginning_of_month + 1.second), till_date_time: (Time.current.at_beginning_of_month + 1.hour))
      end
      let!(:measurement_from_wrong_location) do
        FactoryBot.create(:measurement, location: location_b, from_date_time: (Time.current
          .at_end_of_month - 1.hour), till_date_time: (Time.current.at_end_of_month - 1.second))
      end
      let!(:measurement_from_wrong_time) do
        FactoryBot.create(:measurement, location: location_a, till_date_time: (Time.current
          .at_end_of_month + 1.second))
      end

      it 'returns all measurements from the given month for the given location' do
        expect(subject).to include right_measurement_second
        expect(subject).to include right_measurement_first
        expect(subject).not_to include measurement_from_wrong_location
        expect(subject).not_to include measurement_from_wrong_time
      end
    end

    context 'when database does not contain any measurement from the given month for the given location' do
      let!(:measurement_from_wrong_location) do
        FactoryBot.create(:measurement, location: location_b, from_date_time: (Time.current
          .at_end_of_month - 1.hour), till_date_time: (Time.current.at_end_of_month - 1.second))
      end
      let!(:measurement_from_wrong_time) do
        FactoryBot.create(:measurement, location: location_a, till_date_time: (Time.current.at_end_of_month + 1.second))
      end

      it 'returns an empty array' do
        expect(subject.empty?). to eql true
      end
    end
  end

  describe '#last_hour_measurement' do
    let(:measurements_repository) { MeasurementsRepository.new }
    let!(:location) { FactoryBot.create(:location) }
    let!(:other_location) { FactoryBot.create(:location) }

    subject { measurements_repository.last_hour_measurement(location) }

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
    let(:measurements_repository) { MeasurementsRepository.new }
    let!(:location_zabierzow_1) { FactoryBot.create(:location, name: 'Zabierzów', street: 'stret 1') }
    let!(:location_zabierzow_2) { FactoryBot.create(:location, name: 'Zabierzów', street: 'street 2') }
    let!(:other_location) { FactoryBot.create(:location) }
    let(:location_name) { 'Zabierzów' }

    subject { measurements_repository.last_hour_measurements_by_location_name(location_name) }

    context 'when both Zabierzów locations have last hour measurement' do
      it do
        measurement1 = double
        measurement2 = double
        expect(measurements_repository).to receive(:last_hour_measurement).with(location_zabierzow_1)
          .and_return(measurement1)
        expect(measurements_repository).to receive(:last_hour_measurement).with(location_zabierzow_2)
          .and_return(measurement2)

        expect(subject).to match_array([measurement1, measurement2])
      end
    end

    context 'when only one of Zabierzów locations have last hour measurement' do
      it do
        measurement1 = double
        measurement2 = nil
        expect(measurements_repository).to receive(:last_hour_measurement).with(location_zabierzow_1)
          .and_return(measurement1)
        expect(measurements_repository).to receive(:last_hour_measurement).with(location_zabierzow_2)
          .and_return(measurement2)

        expect(subject).to match_array([measurement1])
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
