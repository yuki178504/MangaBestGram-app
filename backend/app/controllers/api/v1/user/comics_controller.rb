class Api::V1::User::ComicsController < SecuredController
  before_action :set_comic, only: %i(update destroy show)

  def index
    comics = current_user.comics.all.order(id: :desc)
    render json: comics
  end

  def show
    render json: @comic
  end

  def create
    comic = current_user.comics.build(comic_params)
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

  def scene_post_count
    scene_posts = current_user.scene_posts.all
    render json: scene_posts
  end

  private

  def comic_params
    params.permit(:title, :genre, :image)
  end

  def set_comic
    @comic = current_user.comics.find_by!(id: params[:id])
  end
end
