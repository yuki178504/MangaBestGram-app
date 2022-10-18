class ScenePost < ApplicationRecord
  validates_presence_of :body, :published
end
