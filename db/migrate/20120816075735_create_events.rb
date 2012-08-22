class CreateEvents < ActiveRecord::Migration
  def up
    create_table :events do |t|
      t.references :user
      t.string :title, :null => false
      t.date :date, :null => false
      t.integer :repeat, :limit => 1, :default => 0
      t.integer :cal_day, :limit => 2
      t.integer :weekday, :limit => 1
      t.integer :month, :limit => 2

      t.timestamps
    end

    add_index :events, :user_id
  end

  def down
    drop_table :events
  end
end
