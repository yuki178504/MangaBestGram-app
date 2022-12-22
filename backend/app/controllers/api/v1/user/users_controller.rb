class Api::V1::User::UsersController < SecuredController
  def index
    users = @current_user
    render json: users
  end

  def show
    render json: @current_user
  end

  def update
    @current_user.update!(user_params)
  end

  private

  def user_params
    params.permit(:name, :introduction, :image, :url, :e_mail)
  end
end
