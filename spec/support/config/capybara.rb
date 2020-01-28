require 'capybara/rails'
require 'capybara/rspec'

Capybara.default_driver = :selenium_chrome_headless
Capybara.default_max_wait_time = 10

RSpec.configure do |config|
  config.before(:each) do |example|
    Capybara.current_driver = :selenium_chrome if example.metadata[:chrome] || ENV['CHROME']
  end

  config.after(:each) do
    Capybara.use_default_driver
  end
end
