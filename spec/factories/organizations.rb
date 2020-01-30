FactoryBot.define do
  factory :organization do
    organization_name { 'Smog stop' }
    description { 'Walczymy o czyste powietrze w naszym mieście' }
    email { 'smogstop@example.com' }
    facebook { 'https://www.facebook.com/smogstop' }
  end
end
