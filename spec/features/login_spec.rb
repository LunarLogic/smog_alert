require 'rails_helper'

feature 'Login page: invalid credentials display alert to user' do
  background do
    visit new_user_session_path
  end

  scenario 'Login with invalid email or password' do
    error_message = 'Invalid Email or password'
    fill_in('Email', with: 'wrong_email@example.com')
    fill_in('Password', with: 'wrong_password')
    click_button('Log in')
    expect(page).to have_content(error_message)
  end
end

feature 'Login page: valid credentials' do
  background do
    visit admin_root_path
  end

  let!(:user) { FactoryBot.create(:user) }

  scenario 'Signing in without admin permission' do
    error_message = 'Nie masz uprawnień administratora'
    fill_in('Email', with: user.email)
    fill_in('Password', with: user.password)
    click_button('Log in')
    expect(page).to have_content(error_message)
    expect(page).to have_current_path(root_path)
  end

  let!(:admin) { FactoryBot.create(:admin) }

  scenario 'Signing in with admin permission' do
    welcome_message = 'Witaj w panelu Administratora!'
    fill_in('Email', with: admin.email)
    fill_in('Password', with: admin.password)
    click_button('Log in')
    expect(page).to have_content(welcome_message)
    expect(page).to have_current_path(admin_root_path)
  end
end
