class LocationsMeasurementCreator
  def initialize(location)
    @location = location
  end

  def call
    airly_data = AirlyAPI::Measurements.new.by_installation_id(installation_id)
    current_measurement = airly_data['current']
    data = AirlyExtractor::MeasurementData.extract(current_measurement)
    if data
      measurement = @location.measurements.create(data)
      Result::Success.new(data: measurement)
    else
      Result::Error.new(errors: ['There is no installation with a given id'])
    end
  end

  private

  def installation_id
    @location.installation_id
  end
end
