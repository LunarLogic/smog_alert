require 'rails_helper'

feature '#index' do
  xit 'shows list of locations if user signed in' do
    user = FactoryBot.create(:admin)
    sign_in user
    visit admin_locations_path
    expect(page).to have_content(Location.first.name)
  end
end
