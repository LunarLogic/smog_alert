describe AirlyAPI::Measurements do
  describe '#point' do
    it do
      measurements = described_class.new
      response = measurements.point('50.062006', '19.940984')
      byebug
    end
  end
end