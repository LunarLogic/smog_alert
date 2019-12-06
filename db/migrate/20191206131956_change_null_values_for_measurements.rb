class ChangeNullValuesForMeasurements < ActiveRecord::Migration[6.0]
  def change
    change_column_null :measurements, :from_date_time, false
    change_column_null :measurements, :till_date_time, false
    change_column_null :measurements, :date, false
    change_column_null :measurements, :hour, false
  end
end
