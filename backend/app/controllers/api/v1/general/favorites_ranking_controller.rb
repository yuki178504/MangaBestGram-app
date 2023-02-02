class Api::V1::General::FavoritesRankingController < SecuredController
  def favorites_ranking
    scene_posts = ScenePost.includes(:favorite_users).limit(10).sort{|a,b| b.favorite_users.size <=> a.favorite_users.size}
    render_json = General::ScenePostSerializer.new(scene_posts, current_user: @current_user).serializable_hash.to_json
    render json: render_json
  end
end
