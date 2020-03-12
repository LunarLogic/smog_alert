class LocationsRepository
  def ids_of_installations_in_db(ids)
    Location.pluck(:installation_id) & ids
  end

  def locations_with_measurements_from_last_n_hours(number_of_hours)
    Location.eager_load(:measurements)
      .where(['measurements.till_date_time >= ?', (Time.current - number_of_hours.hour)])
  end
end
