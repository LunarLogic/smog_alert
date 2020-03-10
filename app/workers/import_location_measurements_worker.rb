class ImportLocationMeasurementsWorker
  include Sidekiq::Worker
  sidekiq_options queue: :default,
                  lock: :until_executed,
                  log_duplicate_payload: true

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
