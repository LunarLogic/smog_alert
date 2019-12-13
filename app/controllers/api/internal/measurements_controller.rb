class API::Internal::MeasurementsController < API::Internal::BaseController
  class LocationWithLastMeasurementPresenter
    def self.collection(locations)
      locations.map { |location| new(location) }
    end

    def initialize(location)
      @location = location
      @last_hour_measurement = location.last_hour_measurement
    end

    def to_hash
      {
        location_id: @location.id,
        location_name: @location.name,
        lat: @location.latitude,
        lng: @location.longitude,
        last_hour_measurement: last_hour_measurement_values,
      }
    end

    def last_hour_measurement_values
      return nil unless @last_hour_measurement

      {
        from_date_time: @last_hour_measurement.from_date_time,
        till_date_time: @last_hour_measurement.till_date_time,
        values: {
          pm10: @last_hour_measurement.pm10,
          pm25: @last_hour_measurement.pm25,
        }
      }
    end
  end

  def current
    locations = Location.all
    render json: { data: LocationWithLastMeasurementPresenter.collection(locations) }
  end
end
