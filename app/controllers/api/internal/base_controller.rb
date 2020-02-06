module API
  module Internal
    class BaseController < ActionController::Base
      abstract!
      protect_from_forgery with: :exception
      rescue_from(ActionController::ParameterMissing) do |parameter_missing_exception|
        error = {}
        error[parameter_missing_exception.param] = ['parameter is required']
        response = { errors: [error] }
        render json: response, status: :unprocessable_entity
      end

      rescue_from ActiveRecord::RecordNotFound do |exception|
        response = { error: exception }
        render json: response, status: :unprocessable_entity
      end
    end
  end
end
