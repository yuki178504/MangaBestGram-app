class Comic < ApplicationRecord
  belongs_to :user
  has_many :scene_posts, dependent: :destroy
  mount_uploader :image, FileUploader
end
