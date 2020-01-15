FactoryBot.define do
  factory :measurement do
    date { '2019-11-27' }
    hour { '2019-11-27 16:20:15' }
    pm10 { 1.5 }
    pm25 { 1.5 }
    temperature { 1.5 }
    humidity { 1.5 }
    pressure { 1.5 }
    from_date_time { '2019-11-27 16:20:15' }
    till_date_time { '2019-11-27 17:20:15' }
    advice { 'zostań w domu' }
    location
  end
end
