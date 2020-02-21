class HourlyAverageStatisticsCounter
  def initialize(monthly_measurements)
    @monthly_measurements = monthly_measurements
  end

  def call
    hourly_average_pm10_array = []
    hourly_average_pm25_array = []
    hours = 0..23
    hours.each do |hour|
      pm10_by_hour = monthly_average_by_hour(hour, :pm10)
      pm25_by_hour = monthly_average_by_hour(hour, :pm25)
      hourly_average_pm10_array << pm10_by_hour
      hourly_average_pm25_array << pm25_by_hour
    end
    { average_pm10: hourly_average_pm10_array, average_pm25: hourly_average_pm25_array }
  end

  private

  def monthly_average_by_hour(hour, particle)
    unless @monthly_measurements.nil?
      average_pollution = 0
      number_of_days = 0
      @monthly_measurements.each do |measurement|
        next if measurement[:till_date_time].hour != hour

        average_pollution += measurement[particle]
        number_of_days += 1
      end
      unless number_of_days.zero?
        value = average_pollution / number_of_days
        status = GiosScaleChecker.new(particle, value).call
      end
    end
    {
      hour: hour,
      value: value,
      status: status,
    }
  end
end
