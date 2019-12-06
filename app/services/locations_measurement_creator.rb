class LocationsMeasurementCreator
  def initialize(location)
    @location = location
  end

  def call
    airly_data = AirlyAPI::Measurements.new.point(latitude, longitude)
    data = AirlyExtractor::MeasurementData.extract(airly_data)
    if data
      measurement = @location.measurements.create(data)
      Result::Success.new(data: measurement)
    else
      Result::Error.new(errors: ['There are no sensors in this area'])
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
