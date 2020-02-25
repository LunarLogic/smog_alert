class AddForeignKeyToArticles < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :articles, :users, column: :user_id
  end
end
