class Api::V1::ComicsController < ApplicationController

  def index
    comics = Comic.all
    render json: comics
  end

  def show
    comic = Comic.find_by!(id: params[:id])
    render json: comic
  end

  def latest
    comics = Comic.order(updated_at: :desc).limit(3)
    render json: comics
  end
end
