class API::Internal::MeasurementsController < API::Internal::BaseController

  def current
    measurement = Measurement.last
    render json: measurement
  end
end
