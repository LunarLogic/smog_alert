class LocationsRepository
  def last_hour_measurement(location)
    location.measurements.where(['till_date_time >= ?', (Time.current - 1.hour)]).order('till_date_time').last
  end

  def last_hour_measurements_by_location_name(location_name)
    Location.where(name: location_name).map { |location| last_hour_measurement(location) }.compact
  end
end
