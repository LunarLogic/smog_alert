class Article < ApplicationRecord
  has_rich_text :body
  paginates_per 5
  validates :title, presence: true
  validates :body, presence: true

  def make_published
    self.published = true
    self.published_at = Time.current
  end
end
