module AirlyAPI
  class MeasurementCreator < Base
    def initialize(location)
      @location = location
    end

    def create
      airly_data = Measurements.new.point(longitude, latitude)
      @location.measurements.build(
        date: airly_data['current']['fromDateTime'][0,10],
        hour: airly_data['current']['fromDateTime'][11,8], #TODO: fix cause there is a dummy date added because we use Time type in our database
        pm10: airly_data['current']['values'].select { |e| e['name'] == 'PM10' }[0]['value'],
        pm25: airly_data['current']['values'].select { |e| e['name'] == 'PM25' }[0]['value'],
        temperature: airly_data['current']['values'].select { |e| e['name'] == 'temperature'.upcase }[0]['value'],
        humidity: airly_data['current']['values'].select { |e| e['name'] == 'humidity'.upcase }[0]['value'],
        pressure: airly_data['current']['values'].select { |e| e['name'] == 'pressure'.upcase }[0]['value'],
        from_date_time: airly_data['current']['fromDateTime'],
        till_date_time: airly_data['current']['tillDateTime']
      )
    end

    private

    def location_name
      @location.name
    end

    def longitude
      @location.longitude
    end

    def latitude
      @location.latitude
    end

  end
    
end