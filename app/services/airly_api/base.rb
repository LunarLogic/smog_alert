module AirlyAPI
  class Base
    AIRLY_API_URL = 'https://airapi.airly.eu/v2/'.freeze

    private

    def headers
      {
        'Accept' => 'application/json',
        'apikey' => Rails.application.credentials.airly_api_key,
        'Accept-Language' => 'pl',
      }
    end
  end
end
