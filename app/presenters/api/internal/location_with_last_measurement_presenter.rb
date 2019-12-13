class API::Internal::LocationWithLastMeasurementPresenter
  def initialize(location, last_hour_measurement)
    @location = location
    @last_hour_measurement = last_hour_measurement
  end

  def to_hash
    {
      location_id: @location.id,
      location_name: @location.name,
      lat: @location.latitude,
      lng: @location.longitude,
      last_hour_measurement: last_hour_measurement_values,
    }
  end

  def last_hour_measurement_values
    return nil unless @last_hour_measurement

    {
      from_date_time: @last_hour_measurement.from_date_time,
      till_date_time: @last_hour_measurement.till_date_time,
      values: {
        pm10: @last_hour_measurement.pm10,
        pm25: @last_hour_measurement.pm25,
      }
    }
  end
end
