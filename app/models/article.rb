class Article < ApplicationRecord
  belongs_to :user
  has_rich_text :body
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  paginates_per 5

  accepts_nested_attributes_for :tags, allow_destroy: true, reject_if: proc { |attributes| attributes[:name].blank? }

  validates :title, :body, :overview, :user_id, presence: true
  validates :overview, length: { maximum: 1500 }
  validates_associated :tags
end
