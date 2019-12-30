class RemoveUniqueIndexForLocationName < ActiveRecord::Migration[6.0]
  def change
    def change
      # We remove unique index
      remove_index :locations, :name
      # We add index without unique
      add_index :locations, :name
    end
  end
end
