class Api::V1::ComicsController < ApplicationController

  def index
    comics = Comic.all.to_json(include: { user:{only: [:name, :image]} })
    render json: comics
  end

  def show
    post = ScenePost.where(comic_id: params[:id]).to_json(include: { user:{only: [:name, :image]} })
    render json: post
  end

  def latest
    comics = Comic.order(updated_at: :desc).limit(2).to_json(include: { user:{only: [:name, :image]} })
    render json: comics
  end
end
