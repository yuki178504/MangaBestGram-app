class ScenePost < ApplicationRecord
  mount_uploader :scene_image, FileUploader

  has_many :favorites, dependent: :destroy
  has_many :favorite_users, through: :favorites, source: :user
  has_many :comments, dependent: :destroy
  belongs_to :comic
  belongs_to :user

  validates :sub_title, presence: true
  validates :scene_title, presence: true
end
