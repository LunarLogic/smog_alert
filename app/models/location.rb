class Location < ApplicationRecord
  has_many :measurements, dependent: :destroy
  has_one :last_hour_measurement,
          -> { where(['till_date_time >= ?', (Time.current - 1.hour)]).order('till_date_time DESC') },
          class_name: 'Measurement',
          inverse_of: :location
  validates :name, uniqueness: { scope: :street }
  validates :name, presence: true
  validates :installation_id, presence: true
  validates :installation_id, uniqueness: true
  validates :longitude, presence: true
  validates :latitude, presence: true
end
