class Api::V1::FavoritesRankingController < ApplicationController
  def favorites_ranking
    scene_posts = ScenePost.find(Favorite.group(:scene_post_id).order('count(scene_post_id) desc').limit(10).
                  pluck(:scene_post_id))
    render_json = ScenePostSerializer.new(scene_posts).serializable_hash.to_json
    render json: render_json
  end
end
