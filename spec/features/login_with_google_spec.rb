require 'rails_helper'

RSpec.feature 'user logs in' do
  context 'when user sign in with google account for the first time' do
    scenario 'redirects to registration form' do
      visit admin_root_path
      stub_omniauth('annanowak@example.com')
      click_on('Sign in with Google')
      expect(page).to have_content('Skontaktuj się z adminem strony w celu uzyskania dostępu do panelu')
      expect(page).to have_current_path(new_user_registration_path)
    end
  end

  context 'when user exists in database AND user is admin AND user signs in with google account' do
    let!(:admin) { FactoryBot.create(:admin, email: 'annanowak@example.com') }

    scenario 'redirects to the admin panel' do
      visit admin_root_path
      stub_omniauth('annanowak@example.com')
      click_on('Sign in with Google')
      expect(page).to have_current_path(admin_root_path)
    end
  end

  context 'when there is no email in google response' do
    scenario 'redirects to registration form' do
      visit admin_root_path
      stub_omniauth(nil)
      click_on('Sign in with Google')
      expect(page).to have_current_path(new_user_registration_path)
      expect(page).to have_content('Rejestracja nie powiodła się, zarejestruj się za pomocą emaila')
    end
  end

  def stub_omniauth(email)
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new(
      provider: 'google',
      uid: '12345678910',
      info: {
        email: email,
        first_name: 'Anna',
        last_name: 'Nowak'
      },
      credentials: {
        token: 'abcdefg12345',
        refresh_token: '12345abcdefg',
        expires_at: DateTime.now,
      },
    )
  end
end
