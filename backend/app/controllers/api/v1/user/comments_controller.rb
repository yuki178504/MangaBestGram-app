class Api::V1::User::CommentsController < SecuredController
  skip_before_action :authorize_request, only: [:index]
  before_action :set_comment, only: %i(destroy)

  def index
    comments = Comment.all.order(id: :desc)
    render json: comments
  end

  def create
    comment = @current_user.scene_post.find_by!(id: params[:scene_post_id]).comments.build(comment_params)
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
    params.permit(:body)
  end
end
