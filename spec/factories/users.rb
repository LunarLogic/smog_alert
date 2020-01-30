FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "joe#{n}@gmail.com" }
    password { 'blah456' }
    confirmed_at { Time.current }

    factory :admin do
      sequence(:email) { |n| "admin#{n}@gmail.com" }
      admin { true }

      factory :superadmin do
        role { :superadmin }
      end

      factory :editor do
        role { :editor }
      end
    end
  end
end
