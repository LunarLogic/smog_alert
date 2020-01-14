class Location < ApplicationRecord
  has_many :measurements, dependent: :destroy
  validates :name, uniqueness: { scope: :street }
  validates :name, presence: true
  validates :longitude, presence: true
  validates :latitude, presence: true
end
