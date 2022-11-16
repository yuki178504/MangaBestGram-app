class Api::V1::General::ComicsController < SecuredController

  def index
    comics = Comic.all
    render json: comics
  end
end
