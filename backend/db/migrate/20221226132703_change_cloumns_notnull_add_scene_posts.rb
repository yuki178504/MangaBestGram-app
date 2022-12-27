class ChangeCloumnsNotnullAddScenePosts < ActiveRecord::Migration[6.1]
  def change
    change_column :scene_posts, :sub_title, :string, null: false
    change_column :scene_posts, :scene_title, :string, null: false
  end
end
