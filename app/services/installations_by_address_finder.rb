class InstallationsByAddressFinder
  def initialize
    @airly_installations_api = AirlyAPI::Installations.new
  end

  def call(address, max_distance_km)
    coordinates = find_coordinates(address)
    if coordinates
      installations = @airly_installations_api.nearest(
        coordinates.latitude,
        coordinates.longitude,
        max_distance_km,
      )
      Result::Success.new(data: installations)
    else
      Result::Error.new(errors: 'Nie znaleziono lokalizacji. Spróbuj później.')
    end
  end

  private

  def find_coordinates(address)
    result = Geocoder.search(address)
    if result.present?
      coordinates = result.first.coordinates
      OpenStruct.new(latitude: coordinates[0], longitude: coordinates[1])
    end
  end
end
