module AirlyAPI
  class Base
    AIRLY_API_URL = 'https://airapi.airly.eu/v2/'
    private

    def headers
      {
        'Accept' => 'application/json',
        'apikey' => Rails.application.credentials.airly_api_key,
      }
    end
  end
end
