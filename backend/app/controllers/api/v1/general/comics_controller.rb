class Api::V1::General::ComicsController < SecuredController
  def index
    comics = Comic.all.order(updated_at: :desc)
    render_json = General::ComicSerializer.new(comics).serializable_hash.to_json
    render json: render_json
  end
end
