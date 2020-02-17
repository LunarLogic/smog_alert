class Admin::TagsController < Admin::BaseController
  before_action :check_authorization, only: [:destroy]
  after_action :verify_authorized

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
  end
end
