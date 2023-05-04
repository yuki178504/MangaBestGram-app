class Api::V1::ComicsController < ApplicationController
  def index
    comics = Comic.all.order(id: :desc)
    render_json = ComicSerializer.new(comics).serializable_hash
    render json: render_json
  end

  def latest
    comics = Comic.order(updated_at: :desc).limit(10)
    render_json = ComicSerializer.new(comics).serializable_hash
    render json: render_json
  end
end
