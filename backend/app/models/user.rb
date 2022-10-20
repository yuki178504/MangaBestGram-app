class User < ApplicationRecord
  has_many :scene_posts, dependent: :destroy
  #現在のユーザーを取得する
  def self.current_user_from_token_payload(payload)
    find_by(sub: payload['sub'])
  end
  #ユーザーを作成する
  def self.create_user_from_token_payload(payload, name, introduction, image, url)
    user = find_by(sub: payload['sub'])
    if user
      user.update(name: name, introduction: introduction, image: image, url: url)
    else
      ActiveRecord::Base.transaction do
        create_user(payload['sub'], name, introduction, image, url)
      end
    end
  end

  def self.create_user(sub, name, introduction, image, url)
    params = URI.encode_www_form([%w[grant_type client_credentials], ['client_id', ENV['AUTH0_API_CLIENT_ID']],
      ['client_secret', ENV['AUTH0_API_CLIENT_SECRET']], ['audience', ENV['AUTH0_AUDIENCE']]])

  end
end
