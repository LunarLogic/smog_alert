module AirlyAPI
  class Measurements < Base
    def point(lat, lng)
      url = "#{AIRLY_API_URL}measurements/point?lat=#{lat}&lng=#{lng}"
      airly_response_body(url)
    end

    def by_installation_id(id)
      url = "#{AIRLY_API_URL}measurements/installation?installationId=#{id}"
      airly_response_body(url)
    end

    private

    def airly_response_body(url)
      response = begin
                   RestClient.get(url, headers)
                 rescue RestClient::ExceptionWithResponse => e
                   e.response
                 end
      JSON.parse(response.body)
    end
  end
end
