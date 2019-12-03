module AirlyExtractor
  class MeasurementData
    def self.extract(data)
     new(data).extract
    end

    def initialize(data)
      @data = data
    end

    def extract
      return if @data['current']['values'].empty?
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
      }
    end

    private

    def date
      Time.find_zone('UTC').parse(@data['current']['tillDateTime']).to_date
    end

    def hour
      Time.find_zone('UTC').parse(@data['current']['tillDateTime']).hour
    end

    def get(name)
      @data['current']['values'].select { |e| e['name'] == name }[0]['value']
    end

    def from_date_time
      @data['current']['fromDateTime']
    end

    def till_date_time
      @data['current']['tillDateTime']
    end
  end
end
