class ApplicationController < ActionController::Base
  layout :layout_by_resource
  include Pundit

  private

  def layout_by_resource
    if devise_controller?
      'devise'
    else
      'application'
    end
  end
end
