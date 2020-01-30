class API::Internal::HourlyAveragePollutionPresenter
  def initialize(location, date, monthly_measurements)
    @location = location
    @monthly_measurements = monthly_measurements
    @date = date
  end

  def to_hash
    {
      location_id: @location.id,
      location_name: @location.name,
      month: @date.month,
      year: @date.year,
      average_pollution_by_hour: average_pollution_by_hour,
    }
  end

  def average_pollution_by_hour
    return nil unless @monthly_measurements

    HourlyAverageStatisticsCounter.new(@monthly_measurements).call
  end
end
