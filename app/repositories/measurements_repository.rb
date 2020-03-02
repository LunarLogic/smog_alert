class MeasurementsRepository
  def for_location_by_day_and_hour(location, day, hour)
    location.measurements.where(date: day, hour: hour)
  end

  def monthly_measurements(location, starting_time)
    location.measurements.where(['till_date_time < ?', (starting_time + 1.month)])
      .where(['from_date_time >= ?', starting_time])
  end

  def last_hour_measurement(location)
    location.measurements.where(['till_date_time >= ?', (Time.current - 1.hour)]).order('till_date_time').last
  end

  def last_hour_measurements_by_location_name(location_name)
    Location.where(name: location_name).map { |location| last_hour_measurement(location) }.compact
  end
end
