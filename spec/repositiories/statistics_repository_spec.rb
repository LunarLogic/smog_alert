require 'rails_helper'

RSpec.describe StatisticsRepository do
  describe '#monthly_measurements' do
    let(:statistics_repository) {StatisticsRepository.new}
    let!(:location_a) { FactoryBot.create(:location) }
    let!(:location_b) { FactoryBot.create(:location) }

    subject { statistics_repository.monthly_measurements(location_a, Time.now.at_beginning_of_month) }

    context 'when database contains measurements from the given month for the given location' do
      let!(:right_measurement_first) do
        FactoryBot.create(:measurement, location: location_a, from_date_time: (Time.now.at_end_of_month - 1.hour), till_date_time: (Time.now.at_end_of_month - 1.second))
      end
      let!(:right_measurement_second) do
        FactoryBot.create(:measurement, location: location_a, from_date_time: (Time.now.at_beginning_of_month + 1.second), till_date_time: (Time.now.at_beginning_of_month + 1.hour))
      end
      let!(:measurement_from_wrong_location) do
        FactoryBot.create(:measurement, location: location_b, till_date_time: (Time.now.at_end_of_month - 1.hour), till_date_time: (Time.now.at_end_of_month - 1.second))
      end
      let!(:measurement_from_wrong_time) do
        FactoryBot.create(:measurement, location: location_a, till_date_time: (Time.now.at_end_of_month + 1.second))
      end
    
      it 'returns all measurements from the given month for the given location' do
        p subject
        expect(subject).to include right_measurement_second
        expect(subject).to include right_measurement_first
        expect(subject).not_to include measurement_from_wrong_location
        expect(subject).not_to include measurement_from_wrong_time
      end
    end

    # context 'when database doesnt contain any measurement from the given month for the given location' do
    #   let!(:measurement_from_wrong_location) do
    #     FactoryBot.create(:measurement, location: location_b, till_date_time: (Time.now.at_end_of_month - 1.hour), till_date_time: (Time.now.at_end_of_month - 1.second))
    #   end
    #   let!(:measurement_from_wrong_time) do
    #     FactoryBot.create(:measurement, location: location_a, till_date_time: (Time.now.at_end_of_month + 1.second))
    #   end

    #   it 'returns nil' do
    #     expect(subject). to eql nil
    #   end
    # end
  end
end