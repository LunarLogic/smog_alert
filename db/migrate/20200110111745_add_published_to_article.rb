class AddPublishedToArticle < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :published, :boolean, default: false
    add_index :articles, :published
    add_column :articles, :published_at, :datetime, default: nil
  end
end
