class Api::V1::User::ScenePostsController < SecuredController
  before_action :set_scene_post, only: %i(show update destroy)

  def index
    posts = @current_user.comics.find_by!(id: params[:comic_id]).scene_posts.all.order(updated_at: :desc)
    render json: posts
  end

  def show
    render json: @scene_post
  end

  def create
    post = @current_user.comics.find_by!(id: params[:comic_id]).scene_posts.build(scene_post_params)
    if post.save!
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update
    @scene_post.update!(scene_post_update_params)
  end

  def destroy
    @scene_post.destroy!
  end

  private

  def set_scene_post
    @scene_post = @current_user.scene_posts.find_by!(id: params[:id])
  end

  def scene_post_params
    params.permit(:scene_title, :scene_date, :scene_content, :scene_image, :scene_number, :sub_title).
      merge(user_id: @current_user.id)
  end

  def scene_post_update_params
    params.permit(:scene_title, :scene_date, :scene_content, :scene_image, :scene_number, :sub_title)
  end
end
