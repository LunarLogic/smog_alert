class MissingDailyMeasurementsFiller
  def initialize(location)
    @location = location
  end

  def call
    airly_data = AirlyAPI::Measurements.new.point(latitude, longitude)
    historical_data = airly_data['history']
    fill_data(historical_data)
  end

  private

  def fill_data(data)
    return if data.nil?

    added_measurements = 0

    data.each do |hourly_data|
      hour = Time.zone.parse(hourly_data['tillDateTime']).hour
      day = hourly_data['tillDateTime'].to_date
      measurements_taken = measurements_repository.for_location_by_day_and_hour(@location, day, hour)
      next if measurements_taken.count != 0

      missing_data = AirlyExtractor::MeasurementData.extract(hourly_data)
      @location.measurements.create(missing_data)
      added_measurements += 1
    end
    added_measurements
  end

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
