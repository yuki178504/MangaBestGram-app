class Api::V1::UserComicsController < ApplicationController
  def index
    user_comics = Comic.where(user_id: params[:user_id]).order(id: :desc)
    render json: user_comics
  end
end
