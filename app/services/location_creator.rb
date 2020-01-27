class LocationCreator
  attr_reader :installation

  def initialize(installation)
    @installation = installation
  end

  def call
    if @installation.blank?
      Result::Error.new(errors: ['No installation'])
    else
      Location.create(
        name: name,
        street: street,
        longitude: longitude,
        latitude: latitude,
        installation_id: installation_id,
      )
    end
  end

  private

  def name
    @installation['address']['city']
  end

  def street
    street = @installation['address']['street']
    street += " #{@installation['address']['number']}" unless @installation['address']['number'].nil?
    street
  end

  def longitude
    @installation['location']['longitude']
  end

  def latitude
    @installation['location']['latitude']
  end

  def installation_id
    @installation['id']
  end
end
