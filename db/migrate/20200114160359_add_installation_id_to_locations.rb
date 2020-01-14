class AddInstallationIdToLocations < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :installation_id, :integer
  end
end
