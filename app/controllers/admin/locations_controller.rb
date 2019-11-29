class Admin::LocationsController < ApplicationController
  def index
    @locations = Location.all
  end
end
