describe AirlyAPI::MeasurementCreator do
  subject { described_class.new(location) }

  let(:location) { FactoryBot.create(:location) }
  
  describe '#create' do
    let(:measurement_object) { VCR.use_cassette('services/airly_api/measurements_zabierzow') { subject.create }}
    it 'sets date correctly' do
      expect(measurement_object.date).to eq(Date.parse('Thu, 28 Nov 2019'))
    end
    it 'sets hour correctly' do
      expect(measurement_object.hour).to eq(13)
    end
    it 'sets PM10 correctly' do
      expect(measurement_object.pm10).to eq(103.91)
    end
    it 'sets PM25 correctly' do
      expect(measurement_object.pm25).to eq(60.15)
    end
    it 'sets temperature correctly' do
      expect(measurement_object.temperature).to eq(7.73)
    end
    it 'sets humidity correctly' do
      expect(measurement_object.humidity).to eq(91.54)
    end
    it 'sets pressure correctly' do
      expect(measurement_object.pressure).to eq(1000.02)
    end
    it 'sets from_date_time correctly' do
      expect(measurement_object.from_date_time).to eq(DateTime.parse("2019-11-28T12:56:41.684Z"))
    end
    it 'sets till_date_time correctly' do
      expect(measurement_object.till_date_time).to eq(DateTime.parse("2019-11-28T13:56:41.684Z"))
    end
    
  end
end