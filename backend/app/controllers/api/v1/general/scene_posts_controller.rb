class Api::V1::General::ScenePostsController < SecuredController
  def index
    scene_posts = ScenePost.where(comic_id: params[:comic_id]).order(id: :desc)
    render_json = General::ScenePostSerializer.new(scene_posts, current_user: @current_user).serializable_hash.to_json
    render json: render_json
  end

  def show
    scene_post = ScenePost.find(params[:id])
    render_json = General::ScenePostSerializer.new(scene_post).serializable_hash.to_json
    render json: render_json
  end
end
