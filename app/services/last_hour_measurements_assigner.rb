class LastHourMeasurementsAssigner
  def call(locations_with_current_measurements)
    locations_with_current_measurements.map do |location|
      last_hour_measurement = location.last_hour_measurement
      last_hour_measurements_by_location_name =
        current_measurements_for_locations_with_given_name(locations_with_current_measurements, location.name)
      API::Internal::LocationWithLastMeasurementPresenter.new(
        location, last_hour_measurement, last_hour_measurements_by_location_name
      ).to_hash
    end
  end

  def current_measurements_for_locations_with_given_name(all_locations, name)
    all_locations
      .select { |location| location.name == name }
      .map(&:last_hour_measurement).compact
  end
end
