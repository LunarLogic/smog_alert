module Calendar
  class StatusDaysCollector
    def call(location, year)
      averages = DailyAverageValues.new.call(location, year)
      result = {}
      averages.each do |day_data|
        if day_data[:number_of_measurements] < 18
          status = 'zbyt mało danych'
        else
          status = Pm10GiosScaleChecker.new(day_data[:pm10]).call
        end
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
