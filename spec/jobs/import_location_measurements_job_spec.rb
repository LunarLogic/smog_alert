require 'rails_helper'

RSpec.describe ImportLocationMeasurementsJob, type: :job do
  describe '#perform' do
    let(:job) { described_class.new }

    subject { job.perform(location_id) }

    context 'when location exists in DB' do
      let!(:location) { create(:location) }
      let(:location_id) { location.id }

      context 'when measurement for the location is created' do
        it do
          locations_measurement_creator = instance_double(LocationsMeasurementCreator)
          expect(LocationsMeasurementCreator).to receive(:new).with(location).and_return(locations_measurement_creator)

          result = instance_double(Result::Success)
          expect(locations_measurement_creator).to receive(:call).and_return(result)

          expect(result).to receive(:success?).and_return(true)

          expect(job).to receive_message_chain(:logger, :info)
            .with("Measurement for Zabierzow ID:#{location.id} created.")

          subject
        end
      end

      context 'when measurement for the location was not created' do
        it do
          locations_measurement_creator = instance_double(LocationsMeasurementCreator)
          expect(LocationsMeasurementCreator).to receive(:new).with(location).and_return(locations_measurement_creator)

          result = instance_double(Result::Error, errors: ['Fake error message'])
          expect(locations_measurement_creator).to receive(:call).and_return(result)

          expect(result).to receive(:success?).and_return(false)

          expect(job).to receive_message_chain(:logger, :info)
            .with("Measurement for Zabierzow ID:#{location.id} failed because of [\"Fake error message\"]")

          subject
        end
      end
    end

    context 'when location does not exist in DB' do
      let(:location_id) { 1234 }

      it do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
