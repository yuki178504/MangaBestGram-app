class CreateComics < ActiveRecord::Migration[6.1]
  def change
    create_table :comics do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.string :genre, null: false
      t.string :image

      t.timestamps
    end
  end
end
