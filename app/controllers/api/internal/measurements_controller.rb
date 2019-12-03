class API::Internal::MeasurementsController < API::Internal::BaseController
  class LocationWithLastMeasurementPresenter
    def self.collection(locations)
      locations.map { |location| new(location) }
    end

    def initialize(location)
      @location = location
    end

    def to_hash
      { location_name: @location.name }
    end
  end

  def current
    locations = Location.all
    
    render json: { data: LocationWithLastMeasurementPresenter.collection(locations) }
  end
end
