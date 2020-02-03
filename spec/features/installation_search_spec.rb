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
      expect(page).to have_content('Szerokość jest wymagana')
      expect(page).to have_content('Długość jest wymagana')
    end

    it "displays installations when radius wasn't insterted" do
      fill_in 'Długość', with: 19.801340
      fill_in 'Szerokość', with: 50.116440
      within('.coordinates-search-form') do
        click_on('Szukaj')
      end
      expect(page.has_selector?('#installations')).to be true
    end

    it 'displays installations when radius was insterted' do
      fill_in 'Długość', with: 19.801340
      fill_in 'Szerokość', with: 50.116440
      within('.coordinates-search-form') do
        fill_in 'Promień wyszukiwania w kilometrach', with: 10
        click_on('Szukaj')
      end
      expect(page.has_selector?('#installations')).to be true
    end
  end

  context 'Add installation' do
    it 'add installation to locations db' do
      fill_in 'Długość', with: 19.801340
      fill_in 'Szerokość', with: 50.116440
      within('.coordinates-search-form') do
        click_on('Szukaj')
      end
      within('.coordinates-search-form') do
        click_on('Szukaj')
      end
      expect(find('tr.installation-row', text: 'Kolejowa')).to have_button('Dodaj')
      within(find('tr.installation-row', text: 'Kolejowa') do
        expect(find('form input')).to have_attribute('disabled: true')
      end
    end
  end


end
