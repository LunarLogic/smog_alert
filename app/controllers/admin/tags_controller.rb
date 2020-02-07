class Admin::TagsController < Admin::BaseController
  def new
    respond_to do |format|
      format.js
    end
  end
end
