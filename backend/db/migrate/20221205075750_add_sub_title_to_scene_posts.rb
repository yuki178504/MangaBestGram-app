class AddSubTitleToScenePosts < ActiveRecord::Migration[6.1]
  def change
    add_column :scene_posts, :sub_title, :string
  end
end
