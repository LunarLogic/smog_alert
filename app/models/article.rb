class Article < ApplicationRecord
  has_rich_text :body
  paginates_per 5
end
