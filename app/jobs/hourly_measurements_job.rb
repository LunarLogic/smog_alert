class HourlyMeasurementsJob < ApplicationJob
  queue_as :default

  def perform(location_id)
    location = Location.find(location_id)
    LocationsMeasurementCreator.new(location).call
  end
end
