module AirlyAPI
  class Measurements < Base
    def point(lat, lng)
      url = "https://airapi.airly.eu/v2/measurements/point?lat=#{lat}&lng=#{lng}"
      response = RestClient.get(url, headers)
      JSON.parse(response.body)
    end
  end
end