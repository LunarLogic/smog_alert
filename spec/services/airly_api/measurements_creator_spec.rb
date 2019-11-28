describe AirlyAPI::MeasurementCreator do
  subject { described_class.new(location) }

  let(:location) { FactoryBot.create(:location) }
  
  describe '#create' do
    it do
      measurement_object = subject.create
      byebug
    end
  end
end