class Api::V1::FavoritesRankingController < ApplicationController
  def favorites_ranking
    scene_posts = ScenePost.includes(:favorite_users).limit(10).sort{|a,b| b.favorite_users.size <=> a.favorite_users.size}
    render_json = ScenePostSerializer.new(scene_posts).serializable_hash.to_json
    render json: render_json
  end
end
