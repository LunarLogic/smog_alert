class AddOverviewToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :overview, :text, limit: 1000
  end
end
