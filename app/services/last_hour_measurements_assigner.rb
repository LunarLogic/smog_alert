class LastHourMeasurementsAssigner
  def call(locations_with_current_measurements)
    data = locations_with_current_measurements.map do |location|
      last_hour_measurement = location.measurements.last
      last_hour_measurements_by_location_name = locations_with_current_measurements
        .select { |e| e.name == location.name }
        .map { |e| e.measurements.last }
      API::Internal::LocationWithLastMeasurementPresenter.new(
        location, last_hour_measurement, last_hour_measurements_by_location_name
      )
    end
    ids_locations_without_current_measurements = Location.pluck(:id) - locations_with_current_measurements.map(&:id)
    if ids_locations_without_current_measurements.any?
      missing_data = Location.find(ids_locations_without_current_measurements).map do |location|
        API::Internal::LocationWithLastMeasurementPresenter.new(location, nil, [])
      end
      return data + missing_data
    end
    data
  end
end
