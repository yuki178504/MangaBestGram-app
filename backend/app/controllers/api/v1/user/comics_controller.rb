class Api::V1::User::ComicsController < SecuredController
  before_action :set_comic, only: %i[update destroy show]

  def index
    comics = @current_user.comics.all
    render json: comics
  end

  def show
    @comic
    render json: @comic
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
    @comic.update!(comic_params)
  end

  def destroy
    @comic.destroy!
  end

  private

  def comic_params
    params.permit(:title, :genre, :image)
  end

  def set_comic
    @comic = @current_user.comics.find_by!(id: params[:id])
  end
end
