class Api::V1::ScenePostsController < ApplicationController

  def index
    posts = ScenePost.where(comic_id: params[:comic_id]).to_json(include: { user:{only: [:name, :image]} })
    render json: posts
  end

  def show
    post = ScenePost.where(id: params[:id]).to_json(include: { user:{only: [:name, :image]} })
    render json: post
  end
end
