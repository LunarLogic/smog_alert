module Calendar
  class StatusDaysCollector
    def call(location, year)
      averages = DailyAverageValues.new.call(location, year)
      result = {}
      averages.each do |day_data|
        status = Pm10GiosScaleChecker.new(day_data[:pm10]).call
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
