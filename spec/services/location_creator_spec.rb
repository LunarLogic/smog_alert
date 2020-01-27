describe LocationCreator do
  let(:location_creator) { described_class.new(installations[0]) }

  let(:installations) do
    VCR.use_cassette('services/location_creator/installations_near_point') do
      AirlyAPI::Installations.new.nearest(50.116028, 19.800639, "", "")
    end
  end

  it 'creates location from selected installation' do
    expect { location_creator.call }.to change { Location.count }.by(1)
    location = Location.create(
      name: 'Zabierzów',
      street: 'Kolejowa 26',
      installation_id: 9996,
      longitude: 19.800639,
      latitude: 50.116028,
    )
    expect(Location.first.name).to eql(location.name)
    expect(Location.first.installation_id).to eql(location.installation_id)
  end
end
