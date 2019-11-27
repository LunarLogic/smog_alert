module AirlyAPI
  class Base

    private

    def headers
      {
        'Accept' => 'application/json',
        'apikey' => Rails.application.credentials.dig(:airly_api_key)
      }
    end
  end
end