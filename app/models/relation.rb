class Relation < ApplicationRecord
  belongs_to :book, inverse_of: :relations
  belongs_to :character, inverse_of: :relations
  validates :book_id, presence: true
  validates :character_id, presence: true
end
