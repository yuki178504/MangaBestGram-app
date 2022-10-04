class CreateScenePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :scene_posts do |t|
      t.string :scene_title
      t.date :scene_date
      t.text :scene_content
      t.string :scene_image
      t.timestamps
    end
  end
end
