require 'csv'

old_ids_for_locations = [
  {
    new_id: 883,
    old_id: [883]
  },
  {
    new_id: 2274,
    old_id: [2274]
  },
  {
    new_id: 503,
    old_id: [503]
  },
  {
    new_id: 413,
    old_id: [413]
  },
  {
    new_id: 397,
    old_id: [397]
  },
  {
    new_id: 7458,
    old_id: [513]
  },
  {
    new_id: 6095,
    old_id: [396, 3313]
  },
  {
    new_id: 931,
    old_id: [490, 931]
  },
  {
    new_id: 514,
    old_id: [514]
  },
  {
    new_id: 7566,
    old_id: [489]
  },
  {
    new_id: 9946,
    old_id: [412]
  },
  {
    new_id: 6116,
    old_id: [515, 2904]
  },
  {
    new_id: 8154,
    old_id: [510]
  },
  {
    new_id: 6649,
    old_id: [488, 3755]
  },
  {
    new_id: 5707,
    old_id: [392, 3075]
  },
  {
    new_id: 7413,
    old_id: [522, 967]
  },
  {
    new_id: 10_478,
    old_id: [516]
  },
  {
    new_id: 6093,
    old_id: [486, 3089]
  },
  {
    new_id: 388,
    old_id: [388]
  },
  {
    new_id: 493,
    old_id: [493]
  },
  {
    new_id: 491,
    old_id: [491]
  },
  {
    new_id: 482,
    old_id: [482]
  },
  {
    new_id: 2655,
    old_id: [517, 2655]
  },
  {
    new_id: 521,
    old_id: [521]
  },
  {
    new_id: 9996,
    old_id: []
  },
  {
    new_id: 2123,
    old_id: [408, 2123]
  },
  {
    new_id: 615,
    old_id: [615]
  },
  {
    new_id: 7912,
    old_id: [411]
  },
]

namespace :database do
  desc 'Import measurements from old database'
  task import_old_measurements: :environment do
    csv_text = File.read(Rails.root.join('lib', 'old_db', 'measurements.csv'))
    csv = CSV.parse(csv_text, headers: true)
    csv.each do |row|
      location_for_id = old_ids_for_locations.select { |e| e[:old_id].include?(row[0].to_i) }
      # handle when location_for_id is empty
      if location_for_id.empty?
        puts 'Location is not in our db'
        next
      end

      location = Location.find_by(
        installation_id: location_for_id[0][:new_id],
      )
      till_date_time = row['tillDateTime0']
      day = Time.find_zone('UTC').parse(till_date_time).to_date
      hour = Time.find_zone('UTC').parse(till_date_time).hour
      if location.measurements.find_by(date: day,
                                       hour: hour.to_i)
        puts "Skip because measurement for #{location.name} for #{day} at #{hour} already exists"
      else
        puts "Create measurement for #{location.name}"
        puts location.measurements.create(
          date: day,
          hour: hour,
          pm10: row['pm10'],
          pm25: row['pm25'],
          temperature: row['temperature'],
          humidity: row['humidity'],
          pressure: row['pressure'],
          from_date_time: row['fromDateTime0'],
          till_date_time: till_date_time,
        )
      end
    end
  end
end
