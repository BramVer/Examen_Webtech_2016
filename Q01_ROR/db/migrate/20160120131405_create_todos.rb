class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|

    	t.string :ingave_datum
    	t.string :eind_datum
    	t.integer :prioriteit
    	t.string :beschrijving
    	t.string :status
      t.timestamps
    end
  end
end
