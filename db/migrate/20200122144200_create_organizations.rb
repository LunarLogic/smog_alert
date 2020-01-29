class CreateOrganizations < ActiveRecord::Migration[6.0]
  def change
    create_table :organizations do |t|
      t.string :organization_name
      t.text :description
      t.string :email
      t.string :facebook

      t.timestamps
    end
  end
end
