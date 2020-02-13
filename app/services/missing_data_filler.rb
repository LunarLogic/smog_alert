class MissingDataFiller
  def initialize(location)
    @location = location
  end

  def call
    airly_data = AirlyAPI::Measurements.new.point(latitude, longitude)
    historical_data = airly_data['history']
    fill_data(historical_data)
  end

  def fill_data(data)
    return if data.nil?
    data.each do |hourly_data|
      hour = hourly_data['tillDateTime'].to_time.hour
      day = hourly_data['tillDateTime'].to_date
      measurements_taken = measurements_repository.data_presence(@location, day, hour)
      if measurements_taken.empty?
        missing_data = AirlyExtractor::MeasurementData.extract(hourly_data)
        measurement = @location.measurements.create(missing_data)
      end
    end
  end

  private

  def measurements_repository
    MeasurementsRepository.new
  end

  def latitude
    @location.latitude
  end

  def longitude
    @location.longitude
  end
end
