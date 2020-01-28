class API::Internal::OrganizationsController < API::Internal::BaseController
  def current_data
    organization = Organization.last!
    data = API::Internal::OrganizationDataPresenter.new(organization)
    render json: { data: data }
  end
end
