class Book < ApplicationRecord
  has_many :relations, dependent: :destroy
  has_many :characters, through: :relations
  validates :title, presence: true
  validates :description, presence: true
  validates :number_of_pages, presence: true
  validates :publishment_year, presence: true
end
