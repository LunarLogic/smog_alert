class InstallationSearchByAddressForm
  include ActiveModel::Model

  attr_accessor(
    :address,
    :max_distance_km,
  )

  validates :address, presence: true
end
