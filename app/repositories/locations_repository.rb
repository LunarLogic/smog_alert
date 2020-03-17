class LocationsRepository
  def ids_of_installations_in_db(ids)
    Location.pluck(:installation_id) & ids
  end

  def no_current_measurements
  end
end
