class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.references :user, null: false, foreign_key: true
      t.references :scene_post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
