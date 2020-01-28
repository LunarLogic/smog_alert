class API::Internal::OrganizationDataPresenter
  def initialize(organization)
    @organization = organization
  end

  def to_hash
    {
      name: @organization.organization_name,
      description: @organization.description,
      email: @organization.email,
      facebook: @organization.facebook,
      logo: logo_url,
      illustration: illustration_url,
      map: map_url,
    }
  end

  def logo_url
    if @organization.logo.attached?
      Rails.application.routes.url_helpers.rails_blob_path(@organization.logo, only_path: true)
    end
  end

  def illustration_url
    if @organization.illustration.attached?
      Rails.application.routes.url_helpers.rails_blob_path(@organization.illustration, only_path: true)
    end
  end

  def map_url
    if @organization.map.attached?
      Rails.application.routes.url_helpers.rails_blob_path(@organization.map, only_path: true)
    end
  end
end
