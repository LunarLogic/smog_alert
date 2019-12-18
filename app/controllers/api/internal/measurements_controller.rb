class API::Internal::MeasurementsController < API::Internal::BaseController
  def current
    locations = Location.all
    data = locations.map do |location|
      last_hour_measurement = location_repository.last_hour_measurement(location)
      API::Internal::LocationWithLastMeasurementPresenter.new(location, last_hour_measurement)
    end
    render json: { data: data }
  end

  def by_status
    measurements = Measurement.all
    render json: { data: measurements }
  end

  private

  def location_repository
    LocationsRepository.new
  end
end
