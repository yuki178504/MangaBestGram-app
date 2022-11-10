class ScenePost < ApplicationRecord
  mount_uploader :scene_image, FileUploader

  belongs_to :comic
  belongs_to :user
end
