unless Rails.env.production?
  user = User.find_or_create_by(email: 'admin@example.com')

  unless user.confirmed?
    user.admin = true
    password = '123456'
    user.password = password
    user.password_confirmation = password
    user.confirm
  end
end

cities = [
  {
    name: 'Aleksandrowice',
    latitude: 50.081104,
    longitude: 19.764215,
    id: 883,
    street: nil,
    number: nil,
    sponsor: 'Zabierzów'
  },
  {
    name: 'Balice',
    latitude: 50.086516,
    longitude: 19.791139,
    id: 2274,
    street: 'Radziwiłłów',
    number: '1',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Bolechowice',
    latitude: 50.13258,
    longitude: 19.784113,
    id: 503,
    street: 'Zielona',
    number: '245',
    sponsor: 'Anonymous SmogFighter',
  },
  {
    name: 'Bolechowice',
    latitude: 50.147556,
    longitude: 19.793444,
    id: 413,
    street: 'Szkolna',
    number: '37',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Brzezie',
    latitude: 50.124599,
    longitude: 19.822081,
    id: 397,
    street: 'Narodowa',
    number: '37',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Brzezinka',
    latitude: 50.137981,
    longitude: 19.738478,
    id: 7458,
    street: nil,
    number: nil,
    sponsor: 'Zabierzów'
  },
  {
    name: 'Morawica',
    latitude: 50.096481,
    longitude: 19.718288,
    id: 6095,
    street: 'Brzoskwinia',
    number: '186',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Burów',
    latitude: 50.096199,
    longitude: 19.769079,
    id: 931,
    street: nil,
    number: nil,
    sponsor: 'Zabierzów'
  },
  {
    name: 'Karniowice',
    latitude: 50.150635,
    longitude: 19.77784,
    id: 514,
    street: nil,
    number: nil,
    sponsor: 'Zabierzów'
  },
  {
    name: 'Kobylany',
    latitude: 50.14645,
    longitude: 19.763271,
    id: 9946,
    street: 'Jana Pawła II',
    number: '61',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Kochanów',
    latitude: 50.113705,
    longitude: 19.747568,
    id: 6116,
    street: 'Droga Krajowa 79',
    number: '28',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Kleszczów',
    latitude: 50.103592,
    longitude: 19.740849,
    id: 7566,
    street: nil,
    number: nil,
    sponsor: 'Zabierzów',
  },
  {
    name: 'Młynka',
    latitude: 50.112839,
    longitude: 19.695131,
    id: 8154,
    street: nil,
    number: nil,
    sponsor: 'Zabierzów'
  },
  {
    name: 'Niegoszowice',
    latitude: 50.123322,
    longitude: 19.731733,
    id: 6649,
    street: nil,
    number: nil,
    sponsor: 'Zabierzów'
  },
  {
    name: 'Nielepice',
    latitude: 50.110119,
    longitude: 19.700527,
    id: 5707,
    street: 'Długa',
    number: nil,
    sponsor: 'Zabierzów',
  },
  {
    name: 'Nielepice',
    latitude: 50.10684,
    longitude: 19.70766,
    id: 7413,
    street: 'Józefa Trzaskowskiego',
    number: nil,
    sponsor: 'Anonymous SmogFighter',
  },
  {
    name: 'Pisary',
    latitude: 50.124508,
    longitude: 19.701921,
    id: 10478,
    street: nil,
    number: nil,
    sponsor: 'Zabierzów',
  },
  {
    name: 'Radwanowice',
    latitude: 50.148193,
    longitude: 19.709249,
    id: 6093,
    street: '21 Lipca',
    number: '56',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Rząska',
    latitude: 50.099709,
    longitude: 19.837011,
    id: 493,
    street: 'Krakowska',
    number: '122',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Rudawa',
    latitude: 50.122887,
    longitude: 19.707764,
    id: 388,
    street: 'Polaczka',
    number: '25',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Szczyglice',
    latitude: 50.093582,
    longitude: 19.808323,
    id: 491,
    street: 'Sportowa',
    number: '38',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Ujazd',
    latitude: 50.137611,
    longitude: 19.818424,
    id: 482,
    street: 'Świerkowa',
    number: '80',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Więckowice',
    latitude: 50.135612,
    longitude: 19.759342,
    id: 2655,
    street: 'Słoneczna',
    number: '34',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Zabierzów',
    latitude: 50.120655,
    longitude: 19.78093,
    id: 521,
    street: 'Przy Torze',
    number: '63',
    sponsor: 'Airly Ambassador'
  },
  {
    name: 'Zabierzów',
    latitude: 50.116028,
    longitude: 19.800639,
    id: 9996,
    street: 'Kolejowa',
    number: '26',
    sponsor: 'State Environmental Monitoring Station'
  },
  {
    name: 'Zabierzów',
    latitude: 50.116436,
    longitude: 19.801319,
    id: 2123,
    street: 'Wapienna',
    number: nil,
    sponsor: 'Zabierzów'
  },
  {
    name: 'Zelków',
    latitude: 50.15202,
    longitude: 19.803083,
    id: 615,
    street: 'Krakowska',
    number: '225',
    sponsor: 'Anonymous SmogFighter',
  },
  {
    name: 'Zelków',
    latitude: 50.15869,
    longitude: 19.79455,
    id: 7912,
    street: 'Jana Pawła II',
    number: '24',
    sponsor: 'Zabierzów',
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
