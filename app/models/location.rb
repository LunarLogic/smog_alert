class Location < ApplicationRecord
  has_many :measurements, dependent: :destroy
  validates :name, presence: true, uniqueness: true
  validates :longitude, presence: true
  validates :latitude, presence: true

  def last_hour_measurement
    measurements.where(["till_date_time >= ?", (Time.current - 1.hour)]).order("till_date_time").last
  end
end
