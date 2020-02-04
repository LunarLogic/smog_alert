Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, Rails.application.credentials.google_client_id, Rails.application.credentials.google_client_secret, {
    name: 'google',
    scope: ['contacts','plus.login','plus.me','email','profile'],
    prompt: 'select_account',
    image_aspect_ratio: 'square',
    image_size: 50,
    access_type: 'offline'
  }
end
