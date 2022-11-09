class ScenePost < ApplicationRecord
  has_many :scene_post_images, dependent: :destroy
  accepts_nested_attributes_for :scene_post_images
  mount_uploader :scene_image, FileUploader


  belongs_to :comic
  belongs_to :user
end
