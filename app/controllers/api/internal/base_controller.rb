module API
  module Internal
    class BaseController < ActionController::Base
      abstract!
      protect_from_forgery with: :exception
    end
  end
end
