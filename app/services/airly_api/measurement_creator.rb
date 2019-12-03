module AirlyAPI
  class MeasurementCreator
    def initialize(location)
      @location = location
      @extractor = DataExtractor.new
    end

    def build
      airly_data = Measurements.new.point(latitude, longitude)
      @location.measurements.build(@extractor.extract(airly_data))
    end

    def create
      build.save!
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
