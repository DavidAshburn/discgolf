class CreateVariants < ActiveRecord::Migration[7.0]
  def change
    create_table :variants do |t|
      t.string :name
      t.string :one
      t.string :two
      t.string :three
      t.string :four
      t.string :five
      t.string :six
      t.string :seven
      t.string :eight
      t.string :nine
      t.integer :course_id

      t.timestamps
    end
    add_index :variants, :course_id
  end
end
