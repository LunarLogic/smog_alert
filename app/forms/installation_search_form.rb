class InstallationSearchForm
  include ActiveModel::Model

  attr_accessor(
    :longitude,
    :latitude,
    :max_distance_km,
    :max_results,
  )

  validates :longitude, presence: true
  validates :latitude, presence: true
end
