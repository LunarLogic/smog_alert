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
    added_measurements = 0

    data.each do |hourly_data|
      hour = Time.zone.parse(hourly_data['tillDateTime']).hour
      day = hourly_data['tillDateTime'].to_date
      measurements_taken = measurements_repository.data_presence(@location, day, hour)
      if measurements_taken.empty?
        missing_data = AirlyExtractor::MeasurementData.extract(hourly_data)
        @location.measurements.create(missing_data)
        added_measurements += 1
      end
    end
    added_measurements
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
