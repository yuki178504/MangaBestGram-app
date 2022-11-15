class User < ApplicationRecord
  has_many :scene_posts, dependent: :destroy
  has_many :comics, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorite_scene_posts, through: :favorites, source: :scene_post
  mount_uploader :image, FileUploader

  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end

  def favorite(scene_post)
    favorite_scene_posts << scene_post
  end

  def unfavorite(scene_post)
    favorites.find_by(scene_post_id: scene_post.id).destroy
  end
end
