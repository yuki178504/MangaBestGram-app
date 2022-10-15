class Api::V1::AccountsController < ApplicationController

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors
    end
  end

  private

  def user_params
    params.permit(:name)
  end
end
