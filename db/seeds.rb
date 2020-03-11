require_relative '../spec/support/config/active_text_helper.rb'

class ArticleImageHelper
  extend ActiveTextHelper
end

unless Rails.env.production?
  superadmin = User.find_or_create_by(email: 'admin@example.com') do |user|
    user.admin = true
    user.role = :superadmin
    password = '123456'
    user.password = password
    user.password_confirmation = password
    user.confirmed_at = Time.current
  end

  editor = User.find_or_create_by(email: 'editor@example.com') do |user|
    user.admin = true
    user.role = :editor
    password = '123456'
    user.password = password
    user.password_confirmation = password
    user.confirmed_at = Time.current
  end

  Organization.find_or_create_by(organization_name: 'Zabierzowski Alarm Smogowy') do |organization|
    organization.description = 'Stowarzyszenie tworzone przez ludzi, którzy lubią czyste powietrze i zielone drzewa'
    organization.email = 'zabierzow-smog@gmail.com'
    organization.facebook = 'https://facebook.com/ZabierzowskiAlarmSmogowy/'
    path = Rails.root.join('app', 'assets', 'images', 'logo.jpg')
    organization.logo.attach(io: File.open(path), filename: 'logo.jpg')
  end

  if Article.all.count < 45
    # unpublished_articles
    5.times.collect do
      Article.create!(
        title: Faker::Lorem.unique.sentence,
        body: Faker::Lorem.sentence(word_count: 1000),
        overview: Faker::Lorem.sentence(word_count: 100),
        user_id: [editor.id, superadmin.id].sample,
      )
    end

    # published_articles
    5.times.collect do
      Article.create!(
        title: Faker::Lorem.unique.sentence,
        body: Faker::Lorem.sentence(word_count: 1000),
        overview: Faker::Lorem.sentence(word_count: 100),
        user_id: [editor.id, superadmin.id].sample,
        published: true,
        published_at: Time.current,
      )
    end

    # published_articles_with_image
    5.times.collect do
      Article.create!(
        title: Faker::Lorem.unique.sentence,
        body: Faker::Lorem.sentence(word_count: 200) +
              ArticleImageHelper.html_with_image +
              Faker::Lorem.sentence(word_count: 200),
        overview: Faker::Lorem.sentence(word_count: 100),
        user_id: [editor.id, superadmin.id].sample,
        published: true,
        published_at: Time.current,
      )
    end
  end
end

cities = [
  {
    name: 'Aleksandrowice',
    latitude: 50.081104,
    longitude: 19.764215,
    installation_id: 883, # airly sensor id
    street: '',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Balice',
    latitude: 50.086516,
    longitude: 19.791139,
    installation_id: 2274,
    street: 'Radziwiłłów 1',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Bolechowice',
    latitude: 50.13258,
    longitude: 19.784113,
    installation_id: 503,
    street: 'Zielona 245',
    sponsor: 'Anonymous SmogFighter',
  },
  {
    name: 'Bolechowice',
    latitude: 50.147556,
    longitude: 19.793444,
    installation_id: 413,
    street: 'Szkolna 37',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Brzezie',
    latitude: 50.124599,
    longitude: 19.822081,
    installation_id: 397,
    street: 'Narodowa 37',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Brzezinka',
    latitude: 50.137981,
    longitude: 19.738478,
    installation_id: 7458,
    street: '',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Brzoskwinia',
    latitude: 50.096481,
    longitude: 19.718288,
    installation_id: 6095,
    street: 'Brzoskwinia 186',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Burów',
    latitude: 50.096199,
    longitude: 19.769079,
    installation_id: 931,
    street: '',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Karniowice',
    latitude: 50.150635,
    longitude: 19.77784,
    installation_id: 514,
    street: '',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Kleszczów',
    latitude: 50.103592,
    longitude: 19.740849,
    installation_id: 7566,
    street: '',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Kobylany',
    latitude: 50.14645,
    longitude: 19.763271,
    installation_id: 9946,
    street: 'Jana Pawła II 61',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Kochanów',
    latitude: 50.113705,
    longitude: 19.747568,
    installation_id: 6116,
    street: 'Droga Krajowa 79 28',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Młynka',
    latitude: 50.112839,
    longitude: 19.695131,
    installation_id: 8154,
    street: '',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Niegoszowice',
    latitude: 50.123322,
    longitude: 19.731733,
    installation_id: 6649,
    street: '',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Nielepice',
    latitude: 50.110119,
    longitude: 19.700527,
    installation_id: 5707,
    street: 'Długa',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Nielepice',
    latitude: 50.10684,
    longitude: 19.70766,
    installation_id: 7413,
    street: 'Józefa Trzaskowskiego',
    sponsor: 'Anonymous SmogFighter',
  },
  {
    name: 'Pisary',
    latitude: 50.124508,
    longitude: 19.701921,
    installation_id: 10_478,
    street: '',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Radwanowice',
    latitude: 50.148193,
    longitude: 19.709249,
    installation_id: 6093,
    street: '21 Lipca 56',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Rudawa',
    latitude: 50.122887,
    longitude: 19.707764,
    installation_id: 388,
    street: 'Polaczka 25',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Rząska',
    latitude: 50.099709,
    longitude: 19.837011,
    installation_id: 493,
    street: 'Krakowska 122',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Szczyglice',
    latitude: 50.093582,
    longitude: 19.808323,
    installation_id: 491,
    street: 'Sportowa 38',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Ujazd',
    latitude: 50.137611,
    longitude: 19.818424,
    installation_id: 482,
    street: 'Świerkowa 80',
    sponsor: 'Zabierzów',
  },
  {
    name: 'Więckowice',
    latitude: 50.135612,
    longitude: 19.759342,
    installation_id: 2655,
    street: 'Słoneczna 34',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Zabierzów',
    latitude: 50.120655,
    longitude: 19.78093,
    installation_id: 521,
    street: 'Przy Torze 63',
    sponsor: 'Airly Ambassador'
  },
  {
    name: 'Zabierzów',
    latitude: 50.116028,
    longitude: 19.800639,
    installation_id: 9996,
    street: 'Kolejowa 26',
    sponsor: 'State Environmental Monitoring Station'
  },
  {
    name: 'Zabierzów',
    latitude: 50.116436,
    longitude: 19.801319,
    installation_id: 2123,
    street: 'Wapienna',
    sponsor: 'Zabierzów'
  },
  {
    name: 'Zelków',
    latitude: 50.15202,
    longitude: 19.803083,
    installation_id: 615,
    street: 'Krakowska 225',
    sponsor: 'Anonymous SmogFighter',
  },
  {
    name: 'Zelków',
    latitude: 50.15869,
    longitude: 19.79455,
    installation_id: 7912,
    street: 'Jana Pawła II 24',
    sponsor: 'Zabierzów',
  },

]

cities.each do |city|
  location = Location.find_or_create_by(name: city[:name], street: city[:street])
  location.longitude = city[:longitude]
  location.latitude = city[:latitude]
  location.installation_id = city[:installation_id]
  location.save!
end

if Rails.env.development? || Rails.env.test?
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
      advice: 'zostań w domu',
    ).save!
  end

  # data for calendar
  30.times do |day|
    Location.all.each do |location|
      till_date_time = DateTime.new(2019, 12, day + 1, 14)
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
        advice: 'zostań w domu',
      ).save!
    end
  end

  # generate measurements with missing pm data
  till_date_time = DateTime.now

  # when missing pm10
  location1 = Location.find_by(name: 'Aleksandrowice')
  location1.measurements.build(
    date: till_date_time.to_date,
    hour: till_date_time.hour,
    pm10: nil,
    pm25: rand(10.0..80.0).round(2),
    temperature: rand(-10..10),
    humidity: rand(60.0..90.0).round(2),
    pressure: rand(900.0..1100.0).round(2),
    from_date_time: till_date_time - 1.hour,
    till_date_time: till_date_time,
    advice: 'zostań w domu',
  ).save!

  # when missing pm25
  location2 = Location.find_by(name: 'Balice')
  location2.measurements.build(
    date: till_date_time.to_date,
    hour: till_date_time.hour,
    pm10: rand(10.0..80.0).round(2),
    pm25: nil,
    temperature: rand(-10..10),
    humidity: rand(60.0..90.0).round(2),
    pressure: rand(900.0..1100.0).round(2),
    from_date_time: till_date_time - 1.hour,
    till_date_time: till_date_time,
    advice: 'zostań w domu',
  ).save!

  # when missing pm10 and pm25
  location3 = Location.find_by(name: 'Brzezinka')
  location3.measurements.build(
    date: till_date_time.to_date,
    hour: till_date_time.hour,
    pm10: nil,
    pm25: nil,
    temperature: rand(-10..10),
    humidity: rand(60.0..90.0).round(2),
    pressure: rand(900.0..1100.0).round(2),
    from_date_time: till_date_time - 1.hour,
    till_date_time: till_date_time,
    advice: 'zostań w domu',
  ).save!
end
