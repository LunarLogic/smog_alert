class HourlyAverageStatisticsCounter
  def initialize(monthly_measurements)
    @monthly_measurements = monthly_measurements
  end

  def call
    if @monthly_measurements.empty?
      nil
    else
      hourly_average_array = []
      hours = 0..23
      hours.each do |hour|
        average_for_hour = monthly_average_by_hour(hour)
        hourly_average_array << { hour => average_for_hour }
      end
      hourly_average_array
    end
  end

  private

  def monthly_average_by_hour(hour)
    average_pm10 = 0
    average_pm25 = 0
    number_of_days = 0
    @monthly_measurements.each do |measurement|
      next if measurement[:till_date_time].hour != hour

      average_pm10 += measurement[:pm10]
      average_pm25 += measurement[:pm25]
      number_of_days += 1
    end
    unless number_of_days.zero?
      { average_pm10: average_pm10 / number_of_days, average_pm25: average_pm25 / number_of_days }
    end
  end
end
