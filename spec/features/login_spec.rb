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
