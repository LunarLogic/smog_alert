class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
    add_index :locations, :name, unique: true
  end
end
