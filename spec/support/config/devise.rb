
RSpec.configure do |config|
  # https://github.com/plataformatec/devise/wiki/How-To:-sign-in-and-out-a-user-in-Request-type-specs-(specs-tagged-with-type:-:request)
  config.include Devise::Test::IntegrationHelpers, type: :request
end
