class LocationsRepository
  def last_hour_measurement(location)
    location.measurements.where(['till_date_time >= ?', (Time.current - 1.hour)]).order('till_date_time').last
  end
end