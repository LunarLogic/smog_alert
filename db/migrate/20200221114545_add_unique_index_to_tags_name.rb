class AddUniqueIndexToTagsName < ActiveRecord::Migration[6.0]
  def change
    # We remove index
    remove_index :tags, :name
    # We add index with unique
    add_index :tags, :name, unique: true
  end
end
