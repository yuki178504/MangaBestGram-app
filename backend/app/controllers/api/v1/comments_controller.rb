class Api::V1::CommentsController < ApplicationController
  def index
    comments = ScenePost.find_by!(id: params[:scene_post_id]).comments.all.order(id: :desc)
    render_json = User::CommentSerializer.new(comments).serializable_hash.to_json
    render json: render_json
  end

  def favorites_count
    favorites = Favorite.where(scene_post_id: params[:scene_post_id]).all
    render json: favorites
  end
end
