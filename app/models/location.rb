class Location < ApplicationRecord
  has_many :measurements, dependent: :destroy
  validates :name, presence: true, uniqueness: true
  validates_presence_of :longitude
  validates_presence_of :latitude
end
