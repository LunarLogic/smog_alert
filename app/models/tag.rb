class Tag < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :taggings, dependent: :destroy
  has_many :articles, through: :taggings
end
