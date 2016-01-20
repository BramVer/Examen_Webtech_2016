class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|

    	t.string :ingavedatum
    	t.string :einddatum
    	t.integer :prioriteit
    	t.string :beschrijving
    	t.string :status
      t.timestamps
    end
  end
end
