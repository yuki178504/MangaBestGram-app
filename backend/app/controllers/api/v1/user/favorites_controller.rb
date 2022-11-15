class Api::V1::User::FavoritesController < SecuredController

  def create
    favorite = @current_user.favorites.build(scene_post_id: params[:scene_post_id])
    if favorite.save
      render json: favorite
    else
      render json: favorite.errors, status: :unprocessable_entity
    end
  end

  def destroy
    favorite = @current_user.favorites.find_by!(id: params[:id])
    favorite.destroy!
  end
end
