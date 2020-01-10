class HourlyAverageStatisticsCounter
  def initialize(monthly_measurements)
    @monthly_measurements = monthly_measurements
  end

  def call
    hourly_average_array = []
    for hour in 0..23 do
      average_for_hour = monthly_average_by_hour(hour)
      hourly_average_array << { hour => average_for_hour }
    end
    hourly_average_array
  end

  private

  def monthly_average_by_hour(h)
    average_pm10 = 0
    average_pm25 = 0
    number_of_days = 0
    @monthly_measurements.each do |measurement|
      if measurement[:till_date_time].hour == h
        average_pm10 += measurement[:pm10]
        average_pm25 += measurement[:pm25]
        number_of_days +=1
      end
    end
    { average_pm10: average_pm10/number_of_days, average_pm25: average_pm25/number_of_days }
  end
end
