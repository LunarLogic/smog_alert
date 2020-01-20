class ApplicationController < ActionController::Base
  layout :layout_by_resource
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    flash[:notice] = 'Nie masz uprawnień do wykonania tego zadania'
    redirect_to(request.referrer || admin_root_path)
  end

  def layout_by_resource
    if devise_controller?
      'devise'
    else
      'application'
    end
  end
end
