module AirlyAPI
  class Measurements < Base
    def point(lat, lng)
      url = "#{AIRLY_API_URL}measurements/point?lat=#{lat}&lng=#{lng}"
      get_json(url)
    end

    def by_installation_id(id)
      url = "#{AIRLY_API_URL}measurements/installation?installationId=#{id}"
      get_json(url)
    end

    private

    def get_json(url)
      response = begin
                   RestClient.get(url, headers)
                 rescue RestClient::ExceptionWithResponse => e
                   e.response
                 end
      JSON.parse(response.body)
    end
  end
end
