module Calendar
  class DailyAverageValues
    def call(location, year)
      year_measurements = location.measurements.where(date: Date.new(year, 1, 1)..Date.new(year, 12, -1))
      days = year_measurements.distinct.pluck(:date)
      daily_measurements = []
      days.each do |day|
        day_measurements = year_measurements.where(date: day)
        day_measurements_with_data = day_measurements.where.not(pm10: 0)
        daily_measurements << { day: day, pm10: day_measurements_with_data.average(:pm10), pm25: day_measurements_with_data.average(:pm25), number_of_measurements: day_measurements_with_data.count }
      end
      daily_measurements
    end
  end
end
