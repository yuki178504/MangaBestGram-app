class Api::V1::UsersController < SecuredController
  skip_before_action :authorize_request, only: [:create]

  def create
    register_user
  end

  private

  def user_params
    params.require(:user).permit(:name, :introduction, :image, :url)
  end

  def register_user
    authorization = AuthorizationService.new(request.headers)
    user_name = user_params[:name]
    user_introduction = user_params[:introduction]
    user_image = user_params[:image]
    user_url = user_params[:url]
    @current_user = authorization.create_user(user_name, user_introduction, user_image, user_url)
  end
end
