class CreateMeasurements < ActiveRecord::Migration[6.0]
  def change
    create_table :measurements do |t|
      t.date :date
      t.time :hour
      t.float :pm10
      t.float :pm25
      t.float :temperature
      t.float :humidity
      t.float :pressure
      t.datetime :from_date_time
      t.datetime :till_date_time
      t.references :location, null: false, foreign_key: true

      t.timestamps
    end
    add_index :measurements, :date
    add_index :measurements, :hour
  end
end
