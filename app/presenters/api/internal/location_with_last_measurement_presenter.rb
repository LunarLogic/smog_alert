class API::Internal::LocationWithLastMeasurementPresenter
  def initialize(location, last_hour_measurement, last_hour_measurements_by_location_name)
    @location = location
    @last_hour_measurement = last_hour_measurement
    @last_hour_measurements_by_location_name = last_hour_measurements_by_location_name
  end

  def to_hash
    {
      location_id: @location.id,
      location_name: @location.name,
      location_street: @location.street,
      location_display_name: display_name,
      lat: @location.latitude,
      lng: @location.longitude,
      status_of_locations_grouped_by_name: status_of_locations_grouped_by_name,
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

  def status_of_locations_grouped_by_name
    pm10_array = @last_hour_measurements_by_location_name.map(&:pm10)
    return if pm10_array.empty?

    pm10_average = pm10_array.sum / pm10_array.size

    Pm10GiosScaleChecker.new(pm10_average).call
  end
end
