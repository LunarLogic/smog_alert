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
      pm10_average = day_measurements_with_data.average(:pm10)
      {
        date: day,
        number_of_measurements: day_measurements_with_data.size,
        average_values: [
          {
            name: 'PM 10',
            value: pm10_average,
          },
          {
            name: 'PM 2.5',
            value: day_measurements_with_data.average(:pm25),
          },
        ],
        status: determine_status(day_measurements_with_data.size, pm10_average)
      }
    end

    def determine_status(number_of_measurements, pm10_average)
      if number_of_measurements < 18
        'zbyt mało danych'
      else
        GiosScaleChecker.new(:pm10, pm10_average).call
      end
    end
  end
end
