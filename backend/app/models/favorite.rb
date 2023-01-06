class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :scene_post

  validates_uniqueness_of :scene_post_id, scope: :user_id
end
