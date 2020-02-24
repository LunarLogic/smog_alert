class AddForeignKeysToTaggings < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :taggings, :articles
  end
end
