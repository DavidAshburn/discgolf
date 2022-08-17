class AddCourseIdToCards < ActiveRecord::Migration[7.0]
  def change
    add_column :cards, :course_id, :integer
  end
end
