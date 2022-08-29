class CreateVariants < ActiveRecord::Migration[7.0]
  def change
    create_table :variants do |t|
      t.string :name
      t.integer :length
      t.integer :course_id

      t.timestamps
    end
    add_index :variants, :course_id
  end
end
