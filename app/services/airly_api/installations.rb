module AirlyAPI
  class Installations < Base
    def self.nearest(latitude, longitude, maxDistanceKM = nil)
      new(latitude, longitude, maxDistanceKM).nearest
    end

    def initialize(latitude, longitude, maxDistanceKM)
      @latitude = latitude
      @longitude = longitude
      @maxDistanceKM = maxDistanceKM
    end

    def nearest
      url = "#{AIRLY_API_URL}installations/nearest?lat=#{@latitude}&lng=#{@longitude}"
      if @maxDistanceKM
        url += "&maxDistanceKM=#{@maxDistanceKM}"
      end
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
