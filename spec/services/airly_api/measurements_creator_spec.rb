describe AirlyAPI::MeasurementCreator do
    #let(:measurement) { described_class.new(:location) }
  
    describe '#create' do
      it do
        location = FactoryBot.create(:location)
        measurement = described_class.new(location)
        measurement_object = measurement.create
        byebug
      end
    end
  end