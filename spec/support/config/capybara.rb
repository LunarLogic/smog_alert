require 'capybara/rails'
require 'capybara/rspec'

RSpec.configure do |config|
  Capybara.default_driver = :selenium_chrome_headless
end
