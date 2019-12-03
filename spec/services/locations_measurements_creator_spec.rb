describe LocationsMeasurementCreator do
  subject { described_class.new(location) }

  let(:location) { FactoryBot.create(:location) }

  describe '#call' do
    it 'creates new measurement object' do
      VCR.use_cassette 'services/airly_api/measurements_for_zabierzow' do
        expect { subject.call }.to change { Measurement.count }.by(1)
      end
    end

    context do
      before do
        VCR.use_cassette('services/airly_api/measurements_for_zabierzow') do
          subject.call
        end
      end

      it 'sets date correctly' do
        expect(location.measurements.last.date).to eq(Date.parse('Tue, 03 Dec 2019'))
      end
      it 'sets hour correctly' do
        expect(location.measurements.last.hour).to eq(13)
      end
      it 'sets PM10 correctly' do
        expect(location.measurements.last.pm10).to eq(23.89)
      end
      it 'sets PM25 correctly' do
        expect(location.measurements.last.pm25).to eq(12.61)
      end
      it 'sets temperature correctly' do
        expect(location.measurements.last.temperature).to eq(-0.25)
      end
      it 'sets humidity correctly' do
        expect(location.measurements.last.humidity).to eq(86.2)
      end
      it 'sets pressure correctly' do
        expect(location.measurements.last.pressure).to eq(1026.52)
      end
      it 'sets from_date_time correctly' do
        expect(location.measurements.last.from_date_time).to eq(DateTime.parse('2019-12-03T12:17:30.582Z'))
      end
      it 'sets till_date_time correctly' do
        expect(location.measurements.last.till_date_time).to eq(DateTime.parse('2019-12-03T13:17:30.582Z'))
      end
    end
  end
end
