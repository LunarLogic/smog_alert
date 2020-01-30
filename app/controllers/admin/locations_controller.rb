class Admin::LocationsController < Admin::BaseController
  after_action :verify_authorized, except: [:index, :show, :search, :search_by_coordinates, :search_by_address]

  def index
    @locations = Location.all.order(:name, :street)
  end

  def show
    @location = Location.find(params[:id])
  end

  def new
    @location = Location.new
    authorize @location
  end

  def create
    @location = Location.new(location_params)
    authorize @location
    if @location.save
      flash[:success] = 'Pomyślnie utworzono lokalizację'
      redirect_to admin_locations_path
    else
      render 'new'
    end
  end

  def edit
    @location = Location.find(params[:id])
    authorize @location
  end

  def update
    @location = Location.find(params[:id])
    authorize @location
    if @location.update(location_params)
      flash[:success] = 'Pomyślnie edytowano lokalizację'
      redirect_to admin_locations_path
    else
      render 'edit'
    end
  end

  def destroy
    @location = Location.find(params[:id])
    authorize @location
    @location.destroy
    flash[:success] = 'Pomyślnie usunięto lokalizację'
    redirect_to admin_locations_path
  end

  def search
    @search = InstallationSearchForm.new
    @address_search = InstallationSearchByAddressForm.new
  end

  def search_by_coordinates
    @search = InstallationSearchForm.new(search_params)
    @address_search = InstallationSearchByAddressForm.new
    if @search.valid?
      @installations = find_installations(
        @search.latitude,
        @search.longitude,
        @search.max_distance_km,
      )
      @ids_of_installations_in_db = ids_of_installations_in_db(@installations)
    end
    render :search
  end

  def search_by_address
    @search = InstallationSearchForm.new
    @address_search = InstallationSearchByAddressForm.new(address_search_params)
    if @address_search.valid?
      coordinates = find_coordinates
      if coordinates.present?
        @installations = find_installations(
          coordinates[:latitude],
          coordinates[:longitude],
          @address_search.max_distance_km,
        )
        @ids_of_installations_in_db = ids_of_installations_in_db(@installations)
      else
        flash.now[:error] = 'Nie znaleziono lokalizacji'
      end
    end
    render :search
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

  def address_search_params
    if params['installation_search_by_address_form']
      params.require(:installation_search_by_address_form).permit(:address, :max_distance_km, :max_results)
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

  def find_installations(latitude, longitude, max_distance_km)
    optional_params = {}
    optional_params[:max_distance_km] = max_distance_km if max_distance_km
    AirlyAPI::Installations.new.nearest(
      latitude,
      longitude,
      optional_params,
    )
  end

  def find_coordinates
    result = Geocoder.search(address_search_params['address'])
    if result.present?
      coordinates = result.first.coordinates
      {
        latitude: coordinates[0],
        longitude: coordinates[1],
      }
    else
      {}
    end
  end

  def ids_of_installations_in_db(installations)
    return [] if installations.empty?

    Location.pluck(:installation_id) & installations.map { |i| i['id'] }
  end
end
