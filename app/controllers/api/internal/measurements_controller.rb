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
    location = Location.find(params[:location])
    year = params[:year].to_i
    year_measurements = location.measurements.where(date: Date.new(year,01,1)..Date.new(year,12,-1))
    # year_measurements = location.measurements.where("date REGEXP ?", "/^2019/")
    #day_measurements = Measurement.where(["date = ? and location_id = ?", "2019-12-18", location.id])
    avarage_daily_measurements = Calendar::DailyAvarageCalculator.new(year_measurements)
    render json: { data: year_measurements }
  end

  private

  def location_repository
    LocationsRepository.new
  end
end
