module AirlyAPI
  class Base
    AIRLY_API_URL = 'https://airapi.airly.eu/v2/'.freeze

    private

    def get_json(url)
      response = begin
                   RestClient.get(url, headers)
                 rescue RestClient::ExceptionWithResponse => e
                   e.response
                 end
      JSON.parse(response.body)
    end

    def headers
      {
        'Accept' => 'application/json',
        'apikey' => Rails.application.credentials.airly_api_key,
        'Accept-Language' => 'pl',
      }
    end
  end
end
