class Api::V1::ComicsController < ApplicationController

  def index
    comics = Comic.all
    render json: comics
  end

  def show
    post = ScenePost.where(comic_id: params[:id])
    render json: post
  end

  def latest
    comics = Comic.order(updated_at: :desc).limit(3)
    render json: comics
  end
end
