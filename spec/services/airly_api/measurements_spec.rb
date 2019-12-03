describe AirlyAPI::Measurements do
  let(:measurements) { described_class.new }

  describe '#point' do
    subject { measurements.point('50.116436', '19.801319') }

    it do
      VCR.use_cassette 'services/airly_api/measurements_for_zabierzow' do
        expect(subject['current']['values']).not_to be_empty
      end
    end
  end
end
