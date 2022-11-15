class Api::V1::User::FavoritesController < SecuredController

  def create
    scene_post = ScenePost.find(params[:scene_post_id])
    @current_user.favorite(scene_post)
  end

  def destroy
    scene_post = ScenePost.find(params[:id])
    @current_user.unfavorite(scene_post)
  end
end
