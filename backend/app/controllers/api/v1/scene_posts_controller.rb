class Api::V1::ScenePostsController < ApplicationController
  def index
    scene_posts = ScenePost.where(comic_id: params[:comic_id]).order(updated_at: :desc)
    render_json = ScenePostSerializer.new(scene_posts).serializable_hash.to_json
    render json: render_json
  end

  def show
    scene_post = ScenePost.find(params[:id])
    render_json = ScenePostSerializer.new(scene_post).serializable_hash.to_json
    render json: render_json
  end
end
