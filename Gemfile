source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.0'
gem 'pg'

# Use Puma as the app server
gem 'puma', '~> 3.12'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5'

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
# gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

gem 'webpacker', '~> 4.0'

gem 'faker', '~> 2.10'

gem 'simple_form'
gem 'kaminari'

gem 'devise'
gem 'omniauth-google-oauth2'
gem 'honeybadger', '~> 4.0'
gem 'pundit'

gem 'rest-client'

gem 'sidekiq'
gem 'sidekiq-unique-jobs'
gem 'whenever', require: false

gem 'geocoder', '~> 1.6'

gem 'swagger-blocks'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'rspec-rails', '~> 4.0.0.beta3'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Rubocop
  gem 'rubocop', require: false
  gem 'rubocop-rails'
  gem 'factory_bot_rails'
  gem 'guard-rspec', require: false
end

group :production do
  gem 'unicorn'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'capistrano', '~> 3.10', require: false
  gem 'capistrano-rails', '~> 1.3', require: false
  gem 'capistrano-bundler'
  gem 'capistrano-rbenv'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
  gem 'rspec_junit_formatter'
  gem 'vcr'
  gem 'webmock'
  gem 'shoulda-matchers'
  gem 'json_spec'
  gem 'rspec-retry'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
