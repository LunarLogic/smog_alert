class Admin::BaseController < ApplicationController
  layout 'admin'

  before_action :authenticate_user!, :authenticate_admin!

  private

  def authenticate_admin!
    unless current_user.admin?
      flash[:notice] = 'Nie masz uprawnień administratora'
      sign_out current_user
      redirect_to new_user_session_path
    end
  end
end
