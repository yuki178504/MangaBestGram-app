class Api::V1::User::CommentsController < SecuredController
  # skip_before_action :authorize_request, only: [:index]
  before_action :set_comment, only: %i(destroy)

  def index
    # comments = Comment.where(scene_post_id: params[:scene_post_id]).order(id: :desc)
    comments = @current_user.comments.all.order(id: :desc)
    render json: comments
  end

  def create
    comment = @current_user.scene_posts.find_by!(id: params[:scene_post_id]).comments.build(comment_params)
    if comment.save!
      render json: comment
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy!
  end

  private

  def set_comment
    @comment = @current_user.comments.find_by!(id: params[:id])
  end

  def comment_params
    params.permit(:body).merge(user_id: @current_user.id)
  end
end
