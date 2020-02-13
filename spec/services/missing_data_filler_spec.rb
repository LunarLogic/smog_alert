describe MissingDataFiller do
  let(:location) { FactoryBot.create(:fake_zabierzow) }
  let(:missing_data_filler) { described_class.new(location) }

  describe '#call' do
    subject { missing_data_filler.call }

    context 'when there is data missing for a given day for a given location' do
      before do
        hours = 1..21
        hours.each do |num|
          time = '2020-02-11T17:17:17'.to_time - num.hour
          hour = time.hour
          day = time.to_date
          measurement = FactoryBot.create(:measurement, location: location, date: day, hour: hour)
        end
      end

      it 'creates new measurement for a given location' do
        VCR.use_cassette('services/missing_data_filler/measurement_for_zabierzow') do
          expect { subject }.to change { Measurement.count }.by(3)
        end
      end
    end

    context 'when there is no missing data for the given day' do
      before do
        hours = 1..24
        hours.each do |num|
          time = '2020-02-11T17:17:17'.to_time - num.hour
          hour = time.hour
          day = time.to_date
          measurement = FactoryBot.create(:measurement, location: location, date: day, hour: hour)
        end
      end

      it 'does not creat any new measurements' do
        VCR.use_cassette('services/missing_data_filler/measurement_for_zabierzow') do
          expect { subject }.not_to change { Measurement.count }
        end
      end
    end
  end
end
