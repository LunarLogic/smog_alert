class Article < ApplicationRecord
  has_rich_text :body
  paginates_per 5
  validates :title, presence: true
  validates :body, presence: true

  has_many :taggings
  has_many :tags, through: :taggings
end
