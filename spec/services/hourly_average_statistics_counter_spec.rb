require 'rails_helper'

RSpec.describe HourlyAverageStatisticsCounter do
  describe '#call' do
    let(:monthly_data) { [] }
    let(:hourly_average) { HourlyAverageStatisticsCounter.new(monthly_data) }

    subject { hourly_average.call }

    context 'when there is no data for the given month for the given location' do
      it 'returns nil' do
        expect(subject).to eql nil
      end
    end

    context 'when the data for some hours is missing' do
      before do
        hours = 0..10
        hours.each do |hour|
          measurement = FactoryBot.create(:measurement, till_date_time: "2019-11-27 #{hour}:20:15")
          monthly_data << measurement
          second_measurement = FactoryBot
            .create(:measurement, till_date_time: "2019-11-27 #{hour}:50:15", pm10: 5, pm25: 5)
          monthly_data << second_measurement
        end
      end

      it 'returns nil for the missing hours' do
        expect(subject.count).to eql 24
        expect(subject[0]).to be_kind_of(Hash)
        expect(subject[0][0][:average_pm10]).to eql 3.25
        expect(subject[23][23]).to eql nil
      end
    end

    context 'when there is data for all 24 hours for a given month' do
      before do
        hours = 0..23
        hours.each do |hour|
          measurement = FactoryBot.create(:measurement, till_date_time: "2019-11-27 #{hour}:20:15")
          monthly_data << measurement
          second_measurement = FactoryBot
            .create(:measurement, till_date_time: "2019-11-27 #{hour}:50:15", pm10: 5, pm25: 5)
          monthly_data << second_measurement
        end
      end

      it 'returns an array of 24 hashes with average measurements' do
        expect(subject.count).to eql 24
        expect(subject[0]).to be_kind_of(Hash)
        expect(subject[0]).to have_key(0)
        expect(subject[0][0]).to be_kind_of(Hash)
        expect(subject[0][0][:average_pm10]).to eql 3.25
      end
    end
  end
end
