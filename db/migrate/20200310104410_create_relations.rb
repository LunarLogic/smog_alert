class CreateRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :relations do |t|
      t.belongs_to :book, foreign_key: true
      t.belongs_to :character, foreign_key: true

      t.timestamps
    end
  end
end
