describe AirlyAPI::MeasurementCreator do
  subject { described_class.new(location) }

  let(:location) { FactoryBot.create(:location) }

  describe '#build' do
    let(:measurement_object) { VCR.use_cassette('services/airly_api/measurements_for_zabierzow') { subject.build } }
    it 'sets date correctly' do
      expect(measurement_object.date).to eq(Date.parse('Tue, 03 Dec 2019'))
    end
    it 'sets hour correctly' do
      expect(measurement_object.hour).to eq(13)
    end
    it 'sets PM10 correctly' do
      expect(measurement_object.pm10).to eq(23.89)
    end
    it 'sets PM25 correctly' do
      expect(measurement_object.pm25).to eq(12.61)
    end
    it 'sets temperature correctly' do
      expect(measurement_object.temperature).to eq(-0.25)
    end
    it 'sets humidity correctly' do
      expect(measurement_object.humidity).to eq(86.2)
    end
    it 'sets pressure correctly' do
      expect(measurement_object.pressure).to eq(1026.52)
    end
    it 'sets from_date_time correctly' do
      expect(measurement_object.from_date_time).to eq(DateTime.parse('2019-12-03T12:17:30.582Z'))
    end
    it 'sets till_date_time correctly' do
      expect(measurement_object.till_date_time).to eq(DateTime.parse('2019-12-03T13:17:30.582Z'))
    end
  end

  describe '#create' do
    it 'creates new measurement object' do
      VCR.use_cassette 'services/airly_api/measurements_for_zabierzow' do
        expect { subject.create }.to change { Measurement.count }.by(1)
      end
    end
  end
end
