describe LocationsMeasurementCreator do
  let(:locations_measurement_creator) { described_class.new(location) }

  describe '#call' do
    subject { locations_measurement_creator.call }

    context 'when there is an installation with a given id' do
      let(:location) { FactoryBot.create(:location, installation_id: 6091) }

      it 'creates new measurement object' do
        VCR.use_cassette 'services/locations_measurements_creator/measurements_for_installation' do
          expect { subject }.to change { Measurement.count }.by(1)
        end
      end

      context do
        before do
          VCR.use_cassette('services/locations_measurements_creator/measurements_for_installation') do
            subject
          end
        end

        it 'returns successful result' do
          expect(subject.success?).to be true
          expect(subject.data).to eq(location.measurements.last!)
        end

        it 'sets date correctly' do
          expect(location.measurements.last.date).to eq(Date.parse('Tue, 14 Jan 2020'))
        end
        it 'sets hour correctly' do
          expect(location.measurements.last.hour).to eq(16)
        end
        it 'sets PM10 correctly' do
          expect(location.measurements.last.pm10).to eq(62.65)
        end
        it 'sets PM25 correctly' do
          expect(location.measurements.last.pm25).to eq(37.12)
        end
        it 'sets temperature correctly' do
          expect(location.measurements.last.temperature).to eq(1.68)
        end
        it 'sets humidity correctly' do
          expect(location.measurements.last.humidity).to eq(73.38)
        end
        it 'sets pressure correctly' do
          expect(location.measurements.last.pressure).to eq(1019.38)
        end
        it 'sets from_date_time correctly' do
          expect(location.measurements.last.from_date_time).to eq(DateTime.parse('got: 2020-01-14 15:08:36.8820 +0000'))
        end
        it 'sets till_date_time correctly' do
          expect(location.measurements.last.till_date_time).to eq(DateTime.parse('2020-01-14 16:08:36.8820 +0000'))
        end
      end
    end

    context 'when there is no installation with a given id' do
      let(:location) { FactoryBot.create(:location, installation_id: 6092) }

      before do
        VCR.use_cassette('services/locations_measurements_creator/no_installation') do
          subject
        end
      end

      it 'returns error result' do
        expect(subject.success?).to be false
        expect(subject.data).to be nil
        expect(subject.errors).to match_array(['There is no installation with a given id'])
      end
    end
  end
end
