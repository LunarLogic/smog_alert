require 'rails_helper'

feature 'Login page: Validate page elements' do
  background do
    visit 'http://localhost:3000/users/sign_in'
  end

  scenario 'Displayed title: Login' do
    expect(page).to have_css('h2', text: 'Log in')
  end

  scenario 'Displayed textbox: Email' do
    expect(page).to have_field('Email')
  end

  scenario 'Displayed textbox: Password' do
    expect(page).to have_field('Password')
  end

  scenario 'Displayed button: Log in' do
    expect(page).to have_button('Log in')
  end
end

feature 'Login page: invalid credentials display alert to user' do
  background do
    visit 'http://localhost:3000/users/sign_in'
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
    visit 'http://localhost:3000/admin'
  end

  scenario 'Signing in without admin permission' do
    FactoryBot.create(:user)

    fill_in('Email', with: 'joe@gmail.com')
    fill_in('Password', with: 'blah456')
    click_button('Log in')
    expect(page).to have_current_path('http://localhost:3000/')
  end

  scenario 'Signing in with admin permission' do
    FactoryBot.create(:admin)

    fill_in('Email', with: 'admin@gmail.com')
    fill_in('Password', with: 'blah123')
    click_button('Log in')
    expect(page).to have_content('Witaj w panelu Administratora!')
  end
end
