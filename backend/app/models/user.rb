require 'faraday'
require 'faraday/net_http'
require 'erb'
include ERB::Util

Faraday.default_adapter = :net_http

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

    connection = Faraday.new(ENV['AUTH0_DOMAIN']) do |builder|
      builder.adapter :net_http do |http|
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      end
      builder.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    end

    response_for_token = connection.post(ENV['AUTH0_DOMAIN']) do |request|
      request.body = params
    end

  token = JSON.parse(response_for_token.body)['access_token']
  user_id = url_encode(sub)
  response_for_user = connection.get("#{ENV['AUTH0_DOMEIN']}/api/v2/users/#{user_id}") do |request|
    request.headers['Authorization'] = "Bearer #{token}"
  end

  me_introduction = JSON.parse(response_for_user.body)['description']
    create!(sub: sub, name: name, introduction: introduction, image: image, url: url, me_introduction: me_introduction)
  end
end
