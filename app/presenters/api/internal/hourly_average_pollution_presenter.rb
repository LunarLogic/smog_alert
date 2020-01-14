class API::Internal::HourlyAveragePollutionPresenter
  def initialize(location, date, monthly_measurement)
    @location = location
    @monthly_measurement = monthly_measurement
    @date = date
  end

  def to_hash
    a = {
      location_id: @location.id,
      location_name: @location.name,
      month: @date.month,
      year: @date.year,
      average_pollution_by_hour: average_pollution_by_hour,
    }
  end

  def average_pollution_by_hour
    return nil unless @monthly_measurement
    average_counter = HourlyAverageStatisticsCounter.new(@monthly_measurement).call
  end
end
