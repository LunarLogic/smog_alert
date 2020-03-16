class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :description
      t.string :author
      t.integer :number_of_pages
      t.integer :publishment_year

      t.timestamps
    end
  end
end
