class LocationsMeasurementCreator
  def initialize(location)
    @location = location
  end

  def call
    airly_data = AirlyAPI::Measurements.new.point(latitude, longitude)
    data = AirlyExtractor::MeasurementData.extract(airly_data)
    if data
      @location.measurements.create(data)
      true
    else
      false
    end
  end

  private

  def longitude
    @location.longitude
  end

  def latitude
    @location.latitude
  end
end
