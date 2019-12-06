class ChangeMeasurementsHourType < ActiveRecord::Migration[6.0]
  def change
    remove_column :measurements, :hour, :time
    add_column :measurements, :hour, :integer

    add_index :measurements, :hour
  end
end
