module API
  module Internal
    class BaseController < ActionController::Base
      abstract!
      rescue_from(ActionController::ParameterMissing) do |parameter_missing_exception|
        error = {}
        error[parameter_missing_exception.param] = ['parameter is required']
        response = { data: nil, errors: [error] }
        render json: response, status: :unprocessable_entity
      end

      rescue_from ActiveRecord::RecordNotFound do |exception|
        response = { data: nil, errors: [exception] }
        render json: response, status: :not_found
      end
    end
  end
end
