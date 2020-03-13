class LocationsRepository
  def ids_of_installations_in_db(ids)
    Location.pluck(:installation_id) & ids
  end

  def fetch_locations_with_measurements_from_last_hour
    Location.includes(:last_hour_measurement)
  end
end
