class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :sub
      t.string :name
      t.text :introduction
      t.string :image
      t.text :url
      t.timestamps
    end
  end
end
