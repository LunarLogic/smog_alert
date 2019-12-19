class API::Internal::MeasurementsController < API::Internal::BaseController
  def current
    locations = Location.all
    data = locations.map do |location|
      last_hour_measurement = location_repository.last_hour_measurement(location)
      API::Internal::LocationWithLastMeasurementPresenter.new(location, last_hour_measurement)
    end
    render json: { data: data }
  end

  def calendar_values
    location = Location.find(calendar_params[:location_id])
    year = params[:year].to_i
    daily_measurements = Calendar::DailyAverageValues.new.call(year, location)
    render json: { data: { year: year, daily_average_measuremens: daily_measurements } }
  end

  def calendar_by_status

  end

  private

  def location_repository
    LocationsRepository.new
  end

  def calendar_params
    params.require(:year)
    params.require(:location_id)
    params
  end
end
