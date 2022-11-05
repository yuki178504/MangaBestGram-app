class AddSceneNumberToScenePosts < ActiveRecord::Migration[6.1]
  def change
    add_column :scene_posts, :scene_number, :integer
  end
end
