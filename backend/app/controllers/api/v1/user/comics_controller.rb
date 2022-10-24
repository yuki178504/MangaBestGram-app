class Api::V1::User::ComicsController < SecuredController

  def index
    comics = @current_user.comics.all
    render json: comics
  end

  def show
    comic = Comic.find(params[:id])
    render json: comic
  end

  def create
    comic = @current_user.comics.build(comic_params)
    if comic.save
      render json: comic
    else
      render json: comic.errors, status: :unprocessable_entity
    end
  end

  def update
    comic = Comic.find(params[:id])
    if comic.update(comic_params)
      render json: comic
    else
      render json: comic.errors
    end
  end

  def destroy
    comic = Comic.find(params[:id])
    comic.delete
  end

  private

  def comic_params
    params.permit(:title, :genre, :image)
  end
end
