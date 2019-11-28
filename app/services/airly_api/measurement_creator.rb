module AirlyAPI
  class MeasurementCreator
    def initialize(location)
      @location = location
      @extractor = DataExtractor.new
    end

    def create
      airly_data = Measurements.new.point(longitude, latitude)
      @location.measurements.build(@extractor.extract(airly_data))
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