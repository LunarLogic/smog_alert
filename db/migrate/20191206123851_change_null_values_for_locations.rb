class ChangeNullValuesForLocations < ActiveRecord::Migration[6.0]
  def change
    change_column_null :locations, :name, false
    change_column_null :locations, :longitude, false
    change_column_null :locations, :latitude, false
  end
end
