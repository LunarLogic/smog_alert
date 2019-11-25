class Admin::BaseController < ApplicationController
  layout 'admin'

  before_action :authenticate_user!, :authenticate_admin!

  private

  def authenticate_admin!
    unless current_user.admin?
      flash[:alert] = 'Nie masz uprawnień administratora'
      redirect_to root_path
    end
  end
end
