class AddParsToVariants < ActiveRecord::Migration[7.0]
  def change
    add_column :variants, :pars, :string
  end
end
