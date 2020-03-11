class LocationsRepository
  def ids_of_installations_in_db(ids)
    Location.pluck(:installation_id) & ids
  end

  def locations_with_measurements_from_last_n_hours(n)
    Location.eager_load(:measurements).where(['measurements.till_date_time >= ?', (Time.current - n.hour)])
  end
end
