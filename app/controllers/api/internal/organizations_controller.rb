class API::Internal::OrganizationsController < API::Internal::BaseController
  include Swagger::Blocks

  swagger_path '/api/internal/organizations/current_data' do
    operation :get do
      key :summary, 'Get organization data'
      key :produces, [
        'application/json',
      ]
      key :tags, [
        'organization',
      ]
      response 200 do
        key :description, 'Object with organization data'
        schema do
          key :type, :object
          property :data do
            key :type, :object
            property :name do
              key :type, :string
            end
            property :description do
              key :type, :string
            end
            property :email do
              key :type, :string
            end
            property :facebook do
              key :type, :string
            end
            property :logo do
              key :type, :string
            end
            property :illustration do
              key :type, :string
            end
            property :map do
              key :type, :string
            end
          end
        end
      end
      response 404 do
        key :description, 'No organization found'
        schema do
          key :type, :object
          property :data do
              key :type, :string
              key :description, 'Default value is null'
          end
          property :errors do
            key :type, :array
            items do
              key :type, :string  
            end
          end
        end
      end
    end
  end

  def current_data
    organization = Organization.last!
    data = API::Internal::OrganizationDataPresenter.new(organization)
    render json: { data: data }
  end
end
