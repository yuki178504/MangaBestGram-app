class ScenePostImage < ApplicationRecord
  belongs_to :scene_post
  mount_uploader :scene_post_image_url, FileUploader
end
