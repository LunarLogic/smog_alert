module AirlyAPI
  class Installations < Base
    def self.nearest(latitude, longitude, max_distance_km = nil)
      new(latitude, longitude, max_distance_km).nearest
    end

    def initialize(latitude, longitude, max_distance_km)
      @latitude = latitude
      @longitude = longitude
      @max_distance_km = max_distance_km
    end

    def nearest
      url = "#{AIRLY_API_URL}installations/nearest?lat=#{@latitude}&lng=#{@longitude}"
      url += "&maxDistanceKM=#{@max_distance_km}" if @max_distance_km
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
