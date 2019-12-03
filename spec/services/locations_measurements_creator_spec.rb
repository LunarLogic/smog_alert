describe LocationsMeasurementCreator do
  let(:locations_measurement_creator) { described_class.new(location) }

  describe '#call' do
    subject { locations_measurement_creator.call }

    context 'when there is a sensor in a given location' do
      let(:location) { FactoryBot.create(:location) }

      it 'creates new measurement object' do
        VCR.use_cassette 'services/locations_measurements_creator/measurements_for_zabierzow' do
          expect { subject }.to change { Measurement.count }.by(1)
        end
      end

      context do
        before do
          VCR.use_cassette('services/locations_measurements_creator/measurements_for_zabierzow') do
            subject
          end
        end

        it 'returns successful result' do
          expect(subject.success?).to be true
          expect(subject.data).to eq(location.measurements.last!)
        end

        it 'sets date correctly' do
          expect(location.measurements.last.date).to eq(Date.parse('Tue, 03 Dec 2019'))
        end
        it 'sets hour correctly' do
          expect(location.measurements.last.hour).to eq(17)
        end
        it 'sets PM10 correctly' do
          expect(location.measurements.last.pm10).to eq(200.11)
        end
        it 'sets PM25 correctly' do
          expect(location.measurements.last.pm25).to eq(110.1)
        end
        it 'sets temperature correctly' do
          expect(location.measurements.last.temperature).to eq(-1.63)
        end
        it 'sets humidity correctly' do
          expect(location.measurements.last.humidity).to eq(85.13)
        end
        it 'sets pressure correctly' do
          expect(location.measurements.last.pressure).to eq(1027.99)
        end
        it 'sets from_date_time correctly' do
          expect(location.measurements.last.from_date_time).to eq(DateTime.parse('2019-12-03 16:27:23.646000000 +0000'))
        end
        it 'sets till_date_time correctly' do
          expect(location.measurements.last.till_date_time).to eq(DateTime.parse('2019-12-03 17:27:23.646000000 +0000'))
        end
      end
    end

    context 'when there is no sensor in selected location' do
      let(:location) { FactoryBot.create(:location, longitude: 1, latitude: 1) }

      before do
        VCR.use_cassette('services/locations_measurements_creator/no_sensors') do
          subject
        end
      end

      it 'returns error result' do
        expect(subject.success?).to be false
        expect(subject.data).to be nil
        expect(subject.errors).to match_array(['There are no sensors in this area'])
      end
    end
  end
end
