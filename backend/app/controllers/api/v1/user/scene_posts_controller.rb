class Api::V1::User::ScenePostsController < SecuredController

  def index
    posts = @current_user.comics.find_by!(id: params[:comic_id]).posts.all
    render json: posts
  end

  def show
    post = ScenePost.find(params[:id])
    render json: post
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
    post = ScenePost.find(params[:id])
    if post.update(post_params)
      render json: post
    else
      render json: post.errors
    end
  end

  def destroy
    post = ScenePost.find(params[:id])
    post.delete
  end

  private

  def scene_post_params
    params.permit(:scene_title, :scene_date, :scene_content, :scene_image).merge(user_id: @current_user.id)
  end
end
