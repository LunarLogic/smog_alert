require 'csv'

old_ids_for_locations = [
  {
    location: { city: 'Aleksandrowice', street: nil },
    id: [883]
  },
  {
    location: { city: 'Balice', street: 'Radziwiłłów' },
    id: [2274]
  },
  {
    location: { city: 'Bolechowice', street: 'Zielona' },
    id: [503]
  },
  {
    location: { city: 'Bolechowice', street: 'Szkolna' },
    id: [413]
  },
  {
    location: { city: 'Brzezie', street: 'Narodowa' },
    id: [397]
  },
  {
    location: { city: 'Brzezinka', street: nil },
    id: [513]
  },
  {
    location: { city: 'Morawica', street: 'Brzoskwinia' },
    id: [396, 3313]
  },
  {
    location: { city: 'Burów', street: nil },
    id: [490, 931]
  },
  {
    location: { city: 'Karniowice', street: nil },
    id: [514]
  },
  {
    location: { city: 'Kleszczów', street: nil },
    id: [489]
  },
  {
    location: { city: 'Kobylany', street: 'Jana Pawła II' },
    id: [412]
  },
  {
    location: { city: 'Kochanów', street: 'Droga Krajowa 79' },
    id: [515, 2904]
  },
  {
    location: { city: 'Młynka', street: nil },
    id: [510]
  },
  {
    location: { city: 'Niegoszowice', street: nil },
    id: [488, 3755]
  },
  {
    location: { city: 'Nielepice', street: 'Długa' },
    id: [392, 3075]
  },
  {
    location: { city: 'Nielepice', street: 'Józefa Trzaskowskiego' },
    id: [522, 967]
  },
  {
    location: { city: 'Pisary', street: nil },
    id: [516]
  },
  {
    location: { city: 'Radwanowice', street: '21 Lipca' },
    id: [486, 3089]
  },
  {
    location: { city: 'Rudawa', street: 'Polaczka' },
    id: [388]
  },
  {
    location: { city: 'Rząska', street: 'Krakowska' },
    id: [493]
  },
  {
    location: { city: 'Szczyglice', street: 'Sportowa' },
    id: [491]
  },
  {
    location: { city: 'Ujazd', street: 'Świerkowa' },
    id: [482]
  },
  {
    location: { city: 'Więckowice', street: 'Słoneczna' },
    id: [517, 2655]
  },
  {
    location: { city: 'Zabierzów', street: 'Przy Torze' },
    id: [521]
  },
  {
    location: { city: 'Zabierzów', street: 'Kolejowa' },
    id: []
  },
  {
    location: { city: 'Zabierzów', street: 'Wapienna' },
    id: [408, 2123]
  },
  {
    location: { city: 'Zelków', street: 'Krakowska' },
    id: [615]
  },
  {
    location: { city: 'Zelków', street: 'Jana Pawła II' },
    id: [411]
  },
]

namespace :database do
  desc 'Import measurements from old database'
  task import_old_measurements: :environment do
    csv_text = File.read(Rails.root.join('lib', 'old_db', 'measurements.csv'))
    csv = CSV.parse(csv_text, headers: true)
    csv.each do |row|
      location_for_id = old_ids_for_locations.select { |e| e[:id].include?(row[0].to_i) }
      # handle when location_for_id is empty
      if location_for_id.empty?
        puts 'Location is not in our db'
        next
      end

      location = Location.find_by(
        name: location_for_id[0][:location][:city],
        street: location_for_id[0][:location][:street],
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
