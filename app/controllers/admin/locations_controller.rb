class Admin::LocationsController < Admin::BaseController
  def index
    @locations = Location.all.order(:name, :street)
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
      redirect_to admin_locations_path
    else
      render 'new'
    end
  end

  def edit
    @location = Location.find(params[:id])
  end

  def update
    @location = Location.find(params[:id])
    if @location.update(location_params)
      flash[:success] = 'Pomyślnie edytowano lokalizację'
      redirect_to admin_locations_path
    else
      render 'edit'
    end
  end

  def destroy
    Location.find(params[:id]).destroy
    flash[:success] = 'Pomyślnie usunięto lokalizację'
    redirect_to admin_locations_path
  end

  def search
    @search = InstallationSearchForm.new(search_params)
    @installations = find_installations
  end

  private

  def location_params
    params.require(:location).permit(:name, :street, :installation_id, :longitude, :latitude)
  end

  def search_params
    if params['installation_search_form']
      params.require(:installation_search_form).permit(:latitude, :longitude, :max_distance_km, :max_results)
    end
  end

  def find_installations
    if search_params
      AirlyAPI::Installations.nearest(
        search_params['latitude'],
        search_params['longitude'],
        search_params['max_distance_km'],
        search_params['max_results'],
      )
    end
  end
end
