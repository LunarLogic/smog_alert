class LocationsRepository
  def ids_of_installations_in_db(ids)
    Location.pluck(:installation_id) & ids
  end

  def locations_with_last_hour_measurement
    Location.includes(:last_hour_measurement)
  end
end
