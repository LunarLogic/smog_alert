module AirlyExtractor
  class MeasurementData
    def self.extract(data)
      new(data).extract
    end

    def initialize(data)
      @data = data['current']
    end

    def extract
      return if @data.nil? || @data['values'].empty?

      {
        date: date,
        hour: hour,
        pm10: get('PM10'),
        pm25: get('PM25'),
        temperature: get('TEMPERATURE'),
        humidity: get('HUMIDITY'),
        pressure: get('PRESSURE'),
        from_date_time: from_date_time,
        till_date_time: till_date_time,
        advice: advice
      }
    end

    private

    def date
      Time.find_zone('UTC').parse(till_date_time).to_date
    end

    def hour
      Time.find_zone('UTC').parse(till_date_time).hour
    end

    def get(name)
      measurement = @data['values'].select { |e| e['name'] == name }[0]
      if measurement.nil?
        nil
      else
        measurement['value']
      end
    end

    def from_date_time
      @data['fromDateTime']
    end

    def till_date_time
      @data['tillDateTime']
    end

    def advice
      @data['indexes'][0]['advice']
    end
  end
end
