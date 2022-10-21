class User < ApplicationRecord
  has_many :scene_posts, dependent: :destroy
  has_many :comics, dependent: :destroy

  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
