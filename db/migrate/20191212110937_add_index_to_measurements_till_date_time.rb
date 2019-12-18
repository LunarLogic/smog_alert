class AddIndexToMeasurementsTillDateTime < ActiveRecord::Migration[6.0]
  def change
    add_index :measurements, :till_date_time, unique: true
  end
end
