class Organization < ApplicationRecord
  has_one_attached :logo
  has_one_attached :illustration
  has_one_attached :map
end
