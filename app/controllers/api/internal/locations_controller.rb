class API::Internal::LocationsController < API::Internal::BaseController
  def no_current_measurements
    @locations = locations_repository.locations_without_last_hour_measurement
    render json: @locations
  end

  private

  def locations_repository
    LocationsRepository.new
  end
end
