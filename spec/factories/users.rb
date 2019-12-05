FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "joe#{n}@gmail.com" }
    password { 'blah456' }
    confirmed_at { Time.current }

    factory :admin do
      sequence(:email) { |n| "admin#{n}@gmail.com" }
      admin { true }
    end
  end
end
