unless Rails.env.production?
  user = User.find_or_create_by(email: 'admin@example.com')

  unless user.confirmed?
    user.admin = true
    password = '123456'
    user.password = password
    user.password_confirmation = password
    user.confirm
  end

  15.times do
    Article.create([{
      title: Faker::Lorem.unique.sentence,
      body: Faker::Lorem.paragraphs
    }])
  end
end

cities = [
  {
    name: 'Brzezie',
    latitude: 50.124599,
    longitude: 19.822081,
  },
  {
    name: 'Ujazd',
    latitude: 50.137611,
    longitude: 19.818424,
  },
  {
    name: 'Kobylany',
    latitude: 50.14645,
    longitude: 19.763271,
  },
  {
    name: 'Więckowice',
    latitude: 50.135612,
    longitude: 19.759342,
  },
  {
    name: 'Niegoszowice',
    latitude: 50.135612,
    longitude: 19.759342,
  },
  {
    name: 'Brzezinka',
    latitude: 50.137981,
    longitude: 19.738478,
  },
  {
    name: 'Bolechowice',
    latitude: 50.103592,
    longitude: 19.740849,
  },
  {
    name: 'Pisary',
    latitude: 50.124508,
    longitude: 19.701921,
  },
  {
    name: 'Nielepice',
    latitude: 50.108454,
    longitude: 19.702405,
  },
  {
    name: 'Radwanowice',
    latitude: 50.148193,
    longitude: 19.709249,
  },
  {
    name: 'Młynka',
    latitude: 50.112839,
    longitude: 19.695131,
  },
  {
    name: 'Burów',
    latitude: 50.096199,
    longitude: 19.769079,
  },
  {
    name: 'Rząska',
    latitude: 50.099709,
    longitude: 19.837011,
  },
  {
    name: 'Szczyglice',
    latitude: 50.093582,
    longitude: 19.808323,
  },
  {
    name: 'Rudawa',
    latitude: 50.122887,
    longitude: 19.707764,
  },
  {
    name: 'Brzoskwinia',
    latitude: 50.096480,
    longitude: 19.71829,
  },
  {
    name: 'Zabierzów',
    latitude: 50.116436,
    longitude: 19.801319,
  },
  {
    name: 'Kochanów',
    latitude: 50.113705,
    longitude: 19.747568,
  },
  {
    name: 'Balice',
    latitude: 50.086516,
    longitude: 19.791139,
  },
  {
    name: 'Kleszczów',
    latitude: 50.103592,
    longitude: 19.740849,
  },
  {
    name: 'Karniowice',
    latitude: 50.15064,
    longitude: 19.77785,
  },
  {
    name: 'Zelków',
    latitude: 50.15869,
    longitude: 19.79455,
  },
  {
    name: 'Aleksandrowice',
    latitude: 50.08110,
    longitude: 19.76422,
  },

]

cities.each do |city|
  location = Location.find_or_create_by(name: city[:name])
  location.longitude = city[:longitude]
  location.latitude = city[:latitude]
  location.save!
end

if Rails.env.development?
  Location.all.each do |location|
    till_date_time = DateTime.now
    location.measurements.build(
      date: till_date_time.to_date,
      hour: till_date_time.hour,
      pm10: rand(10.0..80.0).round(2),
      pm25: rand(10.0..80.0).round(2),
      temperature: rand(-10..10),
      humidity: rand(60.0..90.0).round(2),
      pressure: rand(900.0..1100.0).round(2),
      from_date_time: till_date_time - 1.hour,
      till_date_time: till_date_time,
    ).save!
  end
end
