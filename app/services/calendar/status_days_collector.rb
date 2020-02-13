module Calendar
  class StatusDaysCollector
    def initialize
      @daily_average_values = DailyAverageValues.new
    end

    def call(location, year)
      averages = @daily_average_values.for_year(location, year)
      result = {}
      averages.each do |day_data|
        status = day_data[:status]
        if result[status].nil?
          result[status] = [day_data[:date]]
        else
          result[status] << day_data[:date]
        end
      end
      result
    end
  end
end
