class Api::V1::User::FavoritesController < SecuredController

  def index
    favorites = Favorite.where(user_id: @current_user.id).pluck(:scene_post_id)
    favorite_list = ScenePost.find(favorites)
    render json: favorite_list
  end

  def create
    scene_post = ScenePost.find(params[:scene_post_id])
    @current_user.favorite(scene_post)
  end

  def destroy
    scene_post = ScenePost.find(params[:id])
    @current_user.unfavorite(scene_post)
  end
end
