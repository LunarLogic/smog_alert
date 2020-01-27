module AirlyAPI
  class Installations < Base

    def nearest(latitude, longitude, max_distance_km = nil, max_results = 5)
      max_distance_km = nil if max_distance_km.blank?
      max_results = 5 if max_results.blank?
      url = "#{AIRLY_API_URL}installations/nearest?lat=#{latitude}&lng=#{longitude}&maxResults=#{max_results}"
      url += "&maxDistanceKM=#{max_distance_km}" if max_distance_km
      get_json(url)
    end
  end
end
