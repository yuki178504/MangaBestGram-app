class Api::V1::UserComicsController < ApplicationController
  def index
    user_comics = Comic.where(user_id: params[:user_id]).order(id: :desc)
    render json: user_comics
  end

  def scene_post_count
    scene_posts = ScenePost.where(user_id: params[:user_id]).all
    render json: scene_posts
  end
end
