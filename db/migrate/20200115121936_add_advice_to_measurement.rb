class AddAdviceToMeasurement < ActiveRecord::Migration[6.0]
  def change
    add_column :measurements, :advice, :string
  end
end
