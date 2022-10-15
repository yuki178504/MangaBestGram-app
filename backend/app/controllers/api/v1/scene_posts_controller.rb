class Api::V1::ScenePostsController < ApplicationController

  def index
    @posts = ScenePost.all
    render json: @posts
  end

  def show
    @post = ScenePost.find(params[:id])
    render json: @post
  end

  def create
    @post = ScenePost.new(post_params)
    if @post.save
      render json: @post
    else
      render json: @post.errors
    end
  end

  def update
    @post = ScenePost.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors
    end
  end

  def destroy
    @post = ScenePost.find(params[:id])
    if @post.destroy
      render json: @post
    else
      render json: @post.errors
    end
  end

  private

  def post_params
    params.require(:scene_post).permit(:scene_title, :scene_date, :scene_content, :scene_image)
  end
end
