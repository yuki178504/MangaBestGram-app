class Api::V1::ScenePostsController < ApplicationController
  #before_action :set_post, only: %i[show destroy update]

  def index
    posts = ScenePost.all
    render json: posts
  end

  def show
    render json: @post
  end

  def create
    post = ScenePost.new(post_params)
    if post.save
      render json: post
    else
      render json: post.errors
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors
    end
  end

  def destroy
    if @post.destroy
      render json: @post
    else
      render json: @post.errors
    end
  end

  private

  def set_post
    @post = ScenePost.find(params[:id])
  end

  def post_params
    params.require(:scene_post).permit(:scene_title, :scene_date, :scene_content, :scene_image)
  end
end
