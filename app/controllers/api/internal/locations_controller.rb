class API::Internal::LocationsController < API::Internal::BaseController
  def no_current_measurements
    @locations = locations_repository.no_current_measurements
  end

  private

  def locations_repository
    LocationsRepository.new
  end
end
