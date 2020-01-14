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
    year = calendar_params[:year].to_i
    daily_measurements = Calendar::DailyAverageValues.new.call(location, year)
    render json: { year: year, daily_average_measurements: daily_measurements }
  end

  def calendar_status
    location = Location.find(calendar_params[:location_id])
    year = calendar_params[:year].to_i
    days_grouped_by_status = Calendar::StatusDaysCollector.new.call(location, year)
    render json: { year => days_grouped_by_status }
  end

  def hourly_average_for_month
    location = Location.find(hourly_stats_params[:location_id])
    date = hourly_stats_params[:date].to_date
    monthly_measurement = statistics_repository.monthly_measurements(location, date)
    data = API::Internal::HourlyAveragePollutionPresenter.new(location, date, monthly_measurement).to_hash
    render json: { data: data }
  end

  private

  def location_repository
    LocationsRepository.new
  end

  def statistics_repository
    StatisticsRepository.new
  end

  def hourly_stats_params
    params.require(:date)
    params.require(:location_id)
    params.permit([:date, :location_id])
  end

  def calendar_params
    params.require(:year)
    params.require(:location_id)
    params.permit([:year, :location_id])
  end
end
