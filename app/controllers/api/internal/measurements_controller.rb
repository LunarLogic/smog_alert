class API::Internal::MeasurementsController < API::Internal::BaseController
  def current
    locations = Location.all
    render json: { data: API::Internal::LocationWithLastMeasurementPresenter.collection(locations) }
  end
end
