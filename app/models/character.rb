class Character < ApplicationRecord
  has_many :relations, dependent: :destroy
  has_many :books, through: :relations
  accepts_nested_attributes_for :books
  validates :first_name, presence: true
  validates :last_name, presence: true
end
