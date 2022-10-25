class Api::V1::User::ScenePostsController < SecuredController

  def index
    posts = @current_user.posts.all
    render json: posts
  end

  def show
    post = ScenePost.find(params[:id])
    render json: post
  end

  def create
    post = @current_user.scene_posts.build(post_params)
    if post.save
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

  def post_params
    params.permit(:scene_title, :scene_date, :scene_content, :scene_image)
  end
end
