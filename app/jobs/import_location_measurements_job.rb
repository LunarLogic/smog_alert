class ImportLocationMeasurementsJob < ApplicationJob
  queue_as :default

  def perform(location_id)
    location = Location.find(location_id)
    result = LocationsMeasurementCreator.new(location).call
    if result.success?
      logger.info("Measurement for #{location.name} ID:#{location.id} created.")
    else
      logger.info("Measurement for #{location.name} ID:#{location.id} failed because of #{result.errors}")
    end
  end
end
