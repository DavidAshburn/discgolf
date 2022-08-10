class AddShotsToCards < ActiveRecord::Migration[7.0]
  def change
    add_column :cards, :shots, :string
  end
end
