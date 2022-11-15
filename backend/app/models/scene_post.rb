class ScenePost < ApplicationRecord
  mount_uploader :scene_image, FileUploader

  has_many :favorites, dependent: :destroy
  belongs_to :comic
  belongs_to :user
end
