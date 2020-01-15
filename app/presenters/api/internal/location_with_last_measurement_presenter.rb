class API::Internal::LocationWithLastMeasurementPresenter
  def initialize(location, last_hour_measurement)
    @location = location
    @last_hour_measurement = last_hour_measurement
  end

  def to_hash
    {
      location_id: @location.id,
      location_name: @location.name,
      location_street: @location.street,
      location_display_name: display_name,
      lat: @location.latitude,
      lng: @location.longitude,
      last_hour_measurement: last_hour_measurement_values,
    }
  end

  def display_name
    if @location.street.blank?
      @location.name
    else
      "#{@location.name}, #{@location.street}"
    end
  end

  def last_hour_measurement_values
    return nil unless @last_hour_measurement

    pm10checker = Pm10GiosScaleChecker.new(@last_hour_measurement.pm10)

    {
      from_date_time: @last_hour_measurement.from_date_time,
      till_date_time: @last_hour_measurement.till_date_time,
      values: [
        { name: 'PM 10', value: @last_hour_measurement.pm10 },
        { name: 'PM 2.5', value: @last_hour_measurement.pm25 },
      ],
      status: pm10checker.call,
      advice: @last_hour_measurement.advice
    }
  end
end
