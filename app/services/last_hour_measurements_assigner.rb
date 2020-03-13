class LastHourMeasurementsAssigner
  def call(locations_with_current_measurements)
    data = locations_with_current_measurements.map do |location|
      last_hour_measurement = location.last_hour_measurement
      last_hour_measurements_by_location_name = locations_with_current_measurements
        .select { |loc| loc.name == location.name }
        .map(&:last_hour_measurement).compact
      API::Internal::LocationWithLastMeasurementPresenter.new(
        location, last_hour_measurement, last_hour_measurements_by_location_name
      ).to_hash
    end
    data
  end
end
