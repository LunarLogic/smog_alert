class AddIndexForNameAndStreetForLocations < ActiveRecord::Migration[6.0]
  def change
    add_index :locations, [:name, :street], unique: true
  end
end
