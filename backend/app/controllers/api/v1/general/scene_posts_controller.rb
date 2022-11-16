class Api::V1::General::ScenePostsController < SecuredController
  def index
    scene_posts = ScenePost.where(comic_id: params[:comic_id])
    render json: posts
  end

  def show
    scene_post = ScenePost.find(params[:id])
    #render_json = ScenePostSerializer.new(scene_post).serializable_hash.to_json
    render json: scene_post
  end
end
