class InstallationSearchForm
  include ActiveModel::Model

  # validates :longitude, :latitude, presence: true
  # validates :latitude, presence: true

  attr_accessor(
    :longitude,
    :latitude,
    :max_distance_km,
    :max_results,
  )

  def to_params
    {
      longitude: longitude,
      latitude: latitude,
      max_distance_km: max_distance_km,
      max_results: max_results,
    }
  end
end
