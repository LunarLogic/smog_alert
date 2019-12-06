require 'rails_helper'

describe 'admin interactions with locations' do
  before :each do
    user = FactoryBot.create(:admin)
    login_as(user, :scope => :user)
  end

  after :each do
    Warden.test_reset!
  end

  # feature '#index' do
  #   it 'shows table with locations' do
  #     visit admin_locations_path
  #     expect(page).to have_table('locations')
  #   end
  # end

  # let(:new_location) { FactoryBot.create(:fake_zabierzow) }

  scenario 'adding new location' do
    visit admin_locations_path
    click_on('new-location')
    expect(page).to have_content('Dodaj lokalizację')
    fill_in 'Name', with: 'new_location.name'
    fill_in 'Longitude', with: 'new_location.longitude'
    fill_in 'Latitude', with: 'new_location.latitude'
    click_on('Create Location')
    expect(page).to have_content('new_location.name')
  end
end
