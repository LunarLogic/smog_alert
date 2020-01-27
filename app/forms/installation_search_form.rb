class InstallationSearchForm
  include ActiveModel::Model

  attr_accessor(
    :longitude,
    :latitude,
    :max_distance_km,
    :max_results,
  )
end
