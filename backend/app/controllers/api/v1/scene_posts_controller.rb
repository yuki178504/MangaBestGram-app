class Api::V1::ScenePostsController < ApplicationController

  def index
    posts = ScenePost.where(comic_id: params[:comic_id])
    comics = Comic.find(params[:comic_id])
    render json: posts
  end

  def show
    post = ScenePost.find(params[:id])
    render json: post
  end
end
