class API::Internal::MeasurementsController < API::Internal::BaseController
  def current
    locations = Location.all
    data = locations.map do |location|
      last_hour_measurement = location_repository.last_hour_measurement(location)
      API::Internal::LocationWithLastMeasurementPresenter.new(location, last_hour_measurement)
    end
    render json: { data: data }
  end

  private

  def location_repository
    LocationsRepository.new
  end
end
