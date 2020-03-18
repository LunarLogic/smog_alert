class API::Internal::LocationsController < API::Internal::BaseController
  include Swagger::Blocks

  swagger_path '/api/internal/locations/no_current_measurements' do
    operation :get do
      key :summary, 'Get locations that don\'t have current measurements'
      key :description, 'Get list of locations that don\'t have measurements from last hour'
      key :produces, [
        'application/json',
      ]
      key :tags, [
        'locations',
      ]
      response 200 do
        key :description, 'Array of locations that don\'t have last hour measurements'
        schema do
          key :type, :array
          items do
            property :id do
              key :type, :integer
            end
            property :location_name do
              key :type, :string
            end
            property :longitude do
              key :type, :number
              key :format, :float
            end
            property :latitude do
              key :type, :number
              key :format, :float
            end
            property :created_at do
              key :type, :string
              key :format, 'date-time'.to_sym
            end
            property :updated_at do
              key :type, :string
              key :format, 'date-time'.to_sym
            end
            property :location_street do
              key :type, :string
            end
            property :installation_id do
              key :type, :integer
            end
          end
        end
      end
    end
  end
  def no_current_measurements
    @locations = locations_repository.locations_without_last_hour_measurement
    render json: @locations
  end

  private

  def locations_repository
    LocationsRepository.new
  end
end
