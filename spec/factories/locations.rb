FactoryBot.define do
  factory :location do
    sequence(:name) { |n| "Town #{n}" }
    latitude { 50.116436 }
    longitude { 19.801319 }

    factory :location_with_measurements do
      transient do
        measurements_count { 10 }
      end

      after(:create) do |location, evaluator|
        create_list(:measurement, evaluator.measurements_count, location: location)
      end
    end
  end

  factory :fake_zabierzow, class: :location do
    name { 'Zabierzow Fake' }
    latitude { 50.116440 }
    longitude { 19.801340 }
  end
end
