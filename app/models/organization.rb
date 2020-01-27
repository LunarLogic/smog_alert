class Organization < ApplicationRecord
  has_one_attached :logo
  has_one_attached :illustration
  has_one_attached :map
  validates :organization_name, presence: true
  validates :description, presence: true
  validates :email, presence: true
end
