class AddComicIdToScenePost < ActiveRecord::Migration[6.1]
  def change
    add_reference :scene_posts, :comic, null: false, foreign_key: true
  end
end
