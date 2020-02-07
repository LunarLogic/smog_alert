class Admin::BaseController < ApplicationController
  layout 'admin'

  before_action :authenticate_user!, :authenticate_admin!, :load_organization

  def load_organization
    @current_organization = Organization.last
  end

  private

  def authenticate_admin!
    unless current_user.admin?
      flash[:error] = 'Nie masz uprawnień administratora'
      sign_out current_user
      redirect_to new_user_session_path
    end
  end
end
