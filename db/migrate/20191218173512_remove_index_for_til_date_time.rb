class RemoveIndexForTilDateTime < ActiveRecord::Migration[6.0]
  def change
    # We remove unique index
    remove_index :measurements, :till_date_time
    # We add index without unique
    add_index :measurements, :till_date_time
  end
end
