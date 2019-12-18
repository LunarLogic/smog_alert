FactoryBot.define do
  factory :location do
    sequence(:name) { |n| "Town #{n}" }
    latitude { 50.116436 }
    longitude { 19.801319 }
  end

  factory :fake_zabierzow, class: :location do
    name { 'Zabierzow Fake' }
    latitude { 50.116440 }
    longitude { 19.801340 }
  end
end
