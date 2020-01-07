class AddStreetToLocation < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :street, :string
  end
end
