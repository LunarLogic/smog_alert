module AirlyAPI
  class MeasurementCreator < Base
    def initialize(location)
      @location = location
    end

    def create
      measurements = Measurements.new.point(longitude, latitude)
      @location.measurements.build(
        date: Time.now.day,
        hour: Time.now.hour,
        pm10: 1.5,
        pm25: 1.5,
        temperature: 1.5,
        humidity: 1.5,
        pressure: 1.5,
        from_date_time: Time.now,
        till_date_time: Time.now
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