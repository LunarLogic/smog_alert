class TownAveragePM10Counter
  def initialize(data)
    @data = data
  end

  def call
    towns = []
    pm10 = []
    town_with_average_pm10 = {}

    data.each do |location|
      town = location[:location_name]
      pm10_for_location = location[:last_hour_measurement][:values].first[:value]
      towns << town
      pm10 << pm10_for_location
      locations_in_town_counter = 1
      if town_with_average_pm10.keys.include?(town)

        town_with_average_pm10[town] += pm10_for_location
        locations_in_town_counter += 1
        town_with_average_pm10[town] = town_with_average_pm10[town] / locations_in_town_counter
      else
        town_with_average_pm10[town] = pm10_for_location
      end
    end
    town_with_average_pm10
  end
end
