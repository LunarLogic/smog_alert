FactoryBot.define do
  factory :user do
    email { 'joe@gmail.com' }
    password { 'blah456' }
    confirmed_at { Time.current }
  end

  factory :admin, class: User do
    email { 'admin@gmail.com' }
    password { 'blah123' }
    admin { true }
    confirmed_at { Time.current }
  end
end
