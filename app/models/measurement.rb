class Measurement < ApplicationRecord
  belongs_to :location
  validates :from_date_time, presence: true
  validates :till_date_time, presence: true
end
