class Article < ApplicationRecord
  belongs_to :user
  has_rich_text :body
  paginates_per 5
  validates :title, :body, :overview, :user_id, presence: true
end
