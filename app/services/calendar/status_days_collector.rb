module Calendar
  class StatusDaysCollector
    def call(location, year)
      averages = DailyAverageValues.new.call(location, year)
      result = {}
      averages.each do |day_data|
        status = if day_data[:number_of_measurements] < 18
                   'zbyt mało danych'
                 else
                   Pm10GiosScaleChecker.new(day_data[:pm10]).call
                 end
                 status = status.parameterize
        if result[status].nil?
          result[status] = [day_data[:day]]
        else
          result[status] << day_data[:day]
        end
      end
      result
    end
  end
end
