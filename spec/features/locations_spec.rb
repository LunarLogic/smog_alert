require 'rails_helper'

def add_new_location(location)
  fill_in 'Name', with: location.name
  fill_in 'Longitude', with: location.longitude
  fill_in 'Latitude', with: location.latitude
  click_on('Create Location')
end

describe 'admin interactions with locations' do
  let!(:location) { FactoryBot.create(:location) }

  before :each do
    user = FactoryBot.create(:admin)
    login_as(user, scope: :user)
    visit admin_locations_path
  end

  after :each do
    Warden.test_reset!
  end

  scenario 'verify table with locations exists' do
    expect(page).to have_table('locations')
  end

  scenario 'verify there is a link to add new location' do
    expect(page).to have_link('Dodaj lokalizację')
  end

  let(:new_location) { FactoryBot.build(:fake_zabierzow) }

  scenario 'adding new location' do
    click_on('new-location')
    expect(page).to have_current_path(new_admin_location_path)
    add_new_location(new_location)
    expect(page).to have_content(new_location.name)
  end

  scenario 'deleting a location' do
    within('.location-row', text: location.name) do
      click_on('Usuń')
      accept_confirm("Czy na pewno chcesz usunąć lokalizację #{location.name}?")
    end
    expect(page).to have_current_path(admin_locations_path)
    expect(page).not_to have_content(location.name)
  end
end