describe AirlyAPI::Measurements do
  describe '#point' do
    it do
      VCR.use_cassette("services/airly_api/measurements/point/get_measurements") do
        measurements = described_class.new
        response = measurements.point('50.062006', '19.940984')
      end
    end
  end
end