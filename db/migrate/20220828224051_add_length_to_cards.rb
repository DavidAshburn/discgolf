class AddLengthToCards < ActiveRecord::Migration[7.0]
  def change
    add_column :cards, :length, :string
  end
end
