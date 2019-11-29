class Location < ApplicationRecord
  has_many :measurements, dependent: :destroy
end
