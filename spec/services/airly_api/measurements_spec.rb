describe AirlyAPI::Measurements do
  let(:measurements) { described_class.new }

  describe '#point' do
    subject { measurements.point('50.118583', '19.790861') }

    it do
      VCR.use_cassette 'services/airly_api/measurements_zabierzow' do
        expect(subject['current']['values']).not_to be_empty
      end
    end
  end
end
