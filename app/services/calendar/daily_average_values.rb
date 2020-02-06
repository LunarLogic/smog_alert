module Calendar
  class DailyAverageValues
    def for_year(location, year)
      year_measurements = location.measurements.where(date: Date.new(year, 1, 1)..Date.new(year, 12, -1))
      days = year_measurements.distinct.pluck(:date)
      daily_measurements = []
      days.each do |day|
        daily_measurements << average_values_for_day(year_measurements, day)
      end
      daily_measurements
    end

    def for_day(location, day)
      average_values_for_day(location.measurements, day)
    end

    private

    def average_values_for_day(measurements, day)
      day_measurements = measurements.where(date: day)
      day_measurements_with_data = day_measurements.where.not(pm10: 0)
      {
        day: day,
        pm10: day_measurements_with_data.average(:pm10),
        pm25: day_measurements_with_data.average(:pm25),
        number_of_measurements: day_measurements_with_data.size
      }
    end
  end
end
