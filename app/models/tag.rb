class Tag < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :taggings, dependent: :destroy, inverse_of: :tag
  has_many :articles, through: :taggings
end
