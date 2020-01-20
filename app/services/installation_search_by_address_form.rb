class InstallationSearchByAddressForm
  include ActiveModel::Model

  attr_accessor(
    :address,
    :max_distance_km,
    :max_results,
  )

  def to_params
    {
      address: address,
      max_distance_km: max_distance_km,
      max_results: max_results,
    }
  end
end
