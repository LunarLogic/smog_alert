require 'rails_helper'

RSpec.feature 'user logs in' do
  scenario 'user signs up with google account' do
    # stub_omniauth
    visit admin_root_path
    expect(page).to have_link('Sign in with Google')
    click_on('Sign in with Google')
    expect(page).to have_content('Continue to Smog Alert')
  #  expect(page).to have_current_path(user_google_oauth2_omniauth_authorize_path)
    # expect(page).to have_content('Anna Nowak')
    # expect(page).to have_link('Logout')
  end

  def stub_omniauth
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:google] = OmniAuth::AuthHash.new({
      provider: "google",
      uid: "12345678910",
      info: {
        email: 'annanowak@example.com',
        first_name: 'Anna',
        last_name: 'Nowak'
      },
      credentials: {
        token: "abcdefg12345",
        refresh_token: "12345abcdefg",
        expires_at: DateTime.now,
      }
    })
  end
end
