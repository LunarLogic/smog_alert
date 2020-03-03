class Article < ApplicationRecord
  belongs_to :user
  has_rich_text :body
  has_many :taggings, dependent: :destroy, inverse_of: :article
  has_many :tags, through: :taggings

  paginates_per 5

  validates :title, :body, :overview, :user_id, presence: true
  validates :overview, length: { maximum: 1500 }
end
