class Article < ApplicationRecord
  has_rich_text :body
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  paginates_per 5

  accepts_nested_attributes_for :tags, allow_destroy: true, reject_if: proc { |attributes| attributes[:name].blank? }

  validates :title, presence: true
  validates :body, presence: true
  validates_associated :tags

  def tags_attributes=(tags)
    self.tags = tags.map do |_, tag|
      Tag.where(name: tag[:name]).first_or_create!
    end
    # super
  end

  def all_tags
    tags.map(&:name).join(', ')
  end
end
