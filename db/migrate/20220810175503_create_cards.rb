class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.integer :score
      t.integer :user_id
      t.integer :variant_id

      t.timestamps
    end
    add_index :cards, :user_id
    add_index :cards, :variant_id
  end
end
