class Article < ApplicationRecord
  has_rich_text :body
  paginates_per 5
  validates :title, presence: true
  validates :body, presence: true
  validates :overview, presence: true
end
