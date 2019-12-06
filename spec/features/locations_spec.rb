require 'rails_helper'

def add_new_location
  fill_in 'Name', with: 'new_location.name'
  fill_in 'Longitude', with: 'new_location.longitude'
  fill_in 'Latitude', with: 'new_location.latitude'
  click_on('Create Location')
end

describe 'admin interactions with locations' do
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

  # let(:new_location) { FactoryBot.create(:fake_zabierzow) }

  scenario 'adding new location' do
    click_on('new-location')
    expect(page).to have_current_path(new_admin_location_path)
    add_new_location
    expect(page).to have_content('new_location.name')
  end
end
