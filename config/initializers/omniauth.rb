Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, Rails.application.credentials.GOOGLE_CLIENT_ID, Rails.application.credentials.GOOGLE_CLIENT_SECRET, {
    name: 'google',
    scope: ['contacts','plus.login','plus.me','email','profile'],
    prompt: 'select_account',
    image_aspect_ratio: 'square',
    image_size: 50,
    access_type: 'offline'
  }
end
