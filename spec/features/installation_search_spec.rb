require 'rails_helper'

describe 'admin search for installations' do
  before :each do
    user = FactoryBot.create(:admin)
    login_as(user, scope: :user)
    visit search_admin_locations_path
  end

  context 'search by address' do
    it 'return error message when no adres given' do
      within('.address-search-form') do
        click_on('Szukaj')
      end
      expect(page).to have_content('Adres jest wymagany')
    end

    it "displays installations when radius wasn't insterted" do
      fill_in 'Adres', with: 'Kraków'
      within('.address-search-form') do
        click_on('Szukaj')
      end
      expect(page.has_selector?('#installations')).to be true
    end

    it 'displays installations when radius was insterted' do
      fill_in 'Adres', with: 'Kraków'
      within('.address-search-form') do
        fill_in 'Promień wyszukiwania w kilometrach', with: 10
        click_on('Szukaj')
      end
      expect(page.has_selector?('#installations')).to be true
    end
  end

  context 'search by coordinates' do
    it 'return error message when no coordinates given' do
      within('.coordinates-search-form') do
        click_on('Szukaj')
      end
      expect(page).to have_content('Współrzędne są wymagane')
    end

    it "displays installations when radius wasn't insterted" do
      fill_in 'Długość', with: 19.800639
      fill_in 'Szerokość', with: 50.062006
      within('.coordinates-search-form') do
        click_on('Szukaj')
      end
      expect(page.has_selector?('#installations')).to be true
    end

    it 'displays installations when radius was insterted' do
      fill_in 'Długość', with: 19.800639
      fill_in 'Szerokość', with: 50.062006
      within('.coordinates-search-form') do
        fill_in 'Promień wyszukiwania w kilometrach', with: 10
        click_on('Szukaj')
      end
      expect(page.has_selector?('#installations')).to be true
    end
  end
end
