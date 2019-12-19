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
    measurements = Measurement.all
    location = Location.find(params[:location])
    year = params[:year].to_i
    year_measurements = location.measurements.where(date: Date.new(year,01,1)..Date.new(year,12,-1))
    # year_measurements = location.measurements.where("date REGEXP ?", "/^2019/")
    #day_measurements = Measurement.where(["date = ? and location_id = ?", "2019-12-18", location.id])
    days = year_measurements.distinct.pluck(:date)
    daily_measurements = []
    days.each do |day|
      day_measurements = year_measurements.where(date: day)
      daily_measurements << [day, avarage_daily_measurement = Calendar::DailyAvaragePm10.new(day_measurements).call]
    end
    render json: { data: { year => daily_measurements } }
  end

  def calendar_by_status

  end

  private

  def location_repository
    LocationsRepository.new
  end
end
