describe LocationFromInstallationCreator do
  let(:location_creator) { described_class.new(installations[0]) }

  let(:installations) do
    VCR.use_cassette('services/location_creator/installations_near_point') do
      AirlyAPI::Installations.new.nearest(50.116028, 19.800639)
    end
  end

  it 'creates location from selected installation' do
    expect { location_creator.call }.to change { Location.count }.by(1)
    first_location = Location.first!
    expect(first_location.name).to eql('Zabierzów')
    expect(first_location.installation_id).to eql(9996)
    expect(first_location.street).to eql('Kolejowa 26')
    expect(first_location.longitude).to eql(19.800639)
    expect(first_location.latitude).to eql(50.116028)
  end
end
