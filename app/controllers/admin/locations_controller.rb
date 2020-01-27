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
    if search_params
      if search_params['latitude'].present? && search_params['longitude'].present?
        @installations = find_installations
      else
        flash.now[:error] = 'Współrzędne są wymagane'
      end
    end
    @ids_of_installations_in_db = ids_of_installations_in_db
  end

  def save
    @installation = format_installation(installation_params)
    LocationFromInstallationCreator.new(@installation).call
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

  def installation_params
    params.require(:installation).permit(
      :id,
      :airly,
      :elevation,
      address: [
        :city,
        :street,
        :number,
        :country,
        :displayAddress1,
        :displayAddress2,
      ],
      location: [:longitude, :latitude],
      sponsor: [:description, :id, :link, :logo, :name],
    )
  end

  def format_installation(installation_hash)
    {
      'id' => installation_hash[:id],
      'address' => installation_hash[:address],
      'location' => installation_hash[:location],
    }
  end

  def find_installations
    AirlyAPI::Installations.new.nearest(
      search_params['latitude'],
      search_params['longitude'],
      search_params['max_distance_km'],
      search_params['max_results'],
    )
  end

  def ids_of_installations_in_db
    if @installations
      Location.pluck(:installation_id) & @installations.map { |i| i['id'] }
    else
      []
    end
  end
end
