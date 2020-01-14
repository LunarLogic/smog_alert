class Location < ApplicationRecord
  has_many :measurements, dependent: :destroy
  validates :name, uniqueness: { scope: :street }
  validates :name, presence: true
  validates :installation_id, presence: true
  validates :installation_id, uniqueness: true
  validates :longitude, presence: true
  validates :latitude, presence: true
end
