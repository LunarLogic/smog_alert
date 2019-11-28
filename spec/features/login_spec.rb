require 'spec_helper'

feature 'Login Page: Validate Page Elements' do
  background do
    visit 'http://localhost:3000/users/sign_in'
  end

  scenario 'Displayed Title: Login' do
    expect(page).to have_css('h2', text: 'Log in')
  end

  scenario 'Displayed Textbox: Email' do
    expect(page).to have_field('Email')
  end

  scenario 'Displayed Textbox: Password' do
    expect(page).to have_field('Password')
  end

  scenario 'Displayed Button: Log in' do
    expect(page).to have_button('Log in')
  end
end