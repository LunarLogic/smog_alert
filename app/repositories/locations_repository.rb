class LocationsRepository
  def ids_of_installations_in_db(ids)
    Location.pluck(:installation_id) & ids
  end

  def locations_with_last_hour_measurement
    Location.includes(:last_hour_measurement)
  end

  def locations_without_last_hour_measurement
    Location.left_outer_joins(:last_hour_measurement).where( measurements: {id: nil})
  end
end
