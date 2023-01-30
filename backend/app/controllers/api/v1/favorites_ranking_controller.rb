class Api::V1::FavoritesRankingController < ApplicationController
  def favorites_ranking
    scene_posts = ScenePost.includes(:favorite_users).sort{|a,b| b.favorite_users.size <=> a.favorite_users.size}
    render json: scene_posts
  end
end
