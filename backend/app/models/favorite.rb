class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :scene_post
end
