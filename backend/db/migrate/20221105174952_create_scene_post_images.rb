class CreateScenePostImages < ActiveRecord::Migration[6.1]
  def change
    create_table :scene_post_images do |t|
      t.references :scene_post, foreign_key: true, null: false
      t.string :scene_post_image_url
      t.timestamps
    end
  end
end
