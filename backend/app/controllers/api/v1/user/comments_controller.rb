class Api::V1::User::CommentsController < SecuredController
  before_action :set_comment, only: %i(destroy)

  def index
    comments = ScenePost.find_by!(id: params[:scene_post_id]).comments.all.order(id: :desc)
    render_json = User::CommentSerializer.new(comments).serializable_hash.to_json
    render json: render_json
  end

  def create
    comment = ScenePost.find_by!(id: params[:scene_post_id]).comments.build(comment_params)
    if comment.save
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
    @comment = current_user.comments.find_by!(id: params[:id])
  end

  def comment_params
    params.permit(:body).merge(user_id: current_user.id)
  end
end
