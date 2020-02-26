class API::Internal::MeasurementsController < API::Internal::BaseController
  def current
    locations = Location.all
    data = locations.map do |location|
      last_hour_measurement = measurements_repository.last_hour_measurement(location)
      last_hour_measurements_by_location_name =
        measurements_repository.last_hour_measurements_by_location_name(location.name)
      API::Internal::LocationWithLastMeasurementPresenter.new(
        location, last_hour_measurement, last_hour_measurements_by_location_name
      )
    end
    render json: { data: data }
  end

  def calendar_daily_values
    location = Location.find(calendar_day_params[:location_id])
    date = calendar_day_params[:date]
    average_measurements = Calendar::DailyAverageValues.new.for_day(location, date)
    render json: average_measurements
  end

  def calendar_values
    location = Location.find(calendar_params[:location_id])
    year = calendar_params[:year].to_i
    daily_measurements = Calendar::DailyAverageValues.new.for_year(location, year)
    render json: { year: year, daily_average_measurements: daily_measurements }
  end

  def calendar_status
    location = Location.find(calendar_params[:location_id])
    year = calendar_params[:year].to_i
    data = API::Internal::DaysWithPollutionStatusPresenter.new(location, year).to_hash
    render json: { data: data }
  end

  def hourly_average_for_month
    location = Location.find(hourly_stats_params[:location_id])
    date = hourly_stats_params[:date].to_date
    monthly_measurement = measurements_repository.monthly_measurements(location, date)
    data = API::Internal::HourlyAveragePollutionPresenter.new(location, date, monthly_measurement).to_hash
    render json: { data: data }
  end

  private

  def measurements_repository
    MeasurementsRepository.new
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

  def calendar_day_params
    params.require(:date)
    params.require(:location_id)
    params.permit([:date, :location_id])
  end
end
