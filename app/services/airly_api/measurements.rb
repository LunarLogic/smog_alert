module AirlyAPI
  class Measurements < Base
    def point(lat, lng)
      url = "#{AIRLY_API_URL}measurements/point?lat=#{lat}&lng=#{lng}"
      response = RestClient.get(url, headers)
      JSON.parse(response.body)
    end
  end
end
