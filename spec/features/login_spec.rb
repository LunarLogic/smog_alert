require 'rails_helper'

feature 'Login page: Login with invalid email or password' do
  background do
    visit new_user_session_path
  end

  scenario 'Show invalid email or password error to user' do
    error_message = 'Błędny adres email lub hasło.'
    fill_in('E-mail', with: 'wrong_email@example.com')
    fill_in('Hasło', with: 'wrong_password')
    click_button('Zaloguj')
    expect(page).to have_content(error_message)
  end
end

feature 'Login page: valid credentials' do
  background do
    visit admin_root_path
  end

  context 'Log in as user' do
    let!(:user) { FactoryBot.create(:user) }

    scenario 'Show no admin permissions error and redirect to home page' do
      error_message = 'Nie masz uprawnień administratora'
      fill_in('E-mail', with: user.email)
      fill_in('Hasło', with: user.password)
      click_button('Zaloguj')
      expect(page).to have_content(error_message)
      expect(page).to have_current_path(new_user_session_path)
    end
  end

  context 'Log in as admin' do
    let!(:admin) { FactoryBot.create(:admin) }

    scenario 'Show welcome message in admin panel' do
      welcome_message = 'Witaj w panelu Administratora!'
      fill_in('E-mail', with: admin.email)
      fill_in('Hasło', with: admin.password)
      click_button('Zaloguj')
      expect(page).to have_content(welcome_message)
      expect(page).to have_current_path(admin_root_path)
    end
  end
end
