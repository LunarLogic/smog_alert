class Admin::LocationsController < Admin::BaseController
  def index
    @locations = Location.all
  end

  def show
    @location = Location.find(params[:id])
  end

  def new
    @location = Location.new
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      flash[:success] = 'Pomyślnie utworzono lokalizację'
      redirect_to admin_location_path(@location)
    else
      render 'new'
    end
  end

  def edit
  end

  def delete
  end

  private

  def location_params
    params.require(:location).permit(:name, :longitude, :latitude)
  end
end
