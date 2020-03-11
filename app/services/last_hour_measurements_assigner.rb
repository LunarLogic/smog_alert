class LastHourMeasurementsAssigner
  def call(locations_with_measurements)
    data = locations_with_measurements.map do |location|
      last_hour_measurement = location.measurements.last
      last_hour_measurements_by_location_name = locations_with_measurements.select {|e| e.name == location.name}.map { |e| e.measurements.last }
      API::Internal::LocationWithLastMeasurementPresenter.new(
        location, last_hour_measurement, last_hour_measurements_by_location_name
      )
    end
    missing_locations_ids = Location.pluck(:id) - locations_with_measurements.map(&:id)
    if missing_locations_ids.any?
      missing_data = Location.find(missing_locations_ids).map do |location|
        API::Internal::LocationWithLastMeasurementPresenter.new(location, nil, [])
      end
      return data + missing_data
    end
    data
  end
end
