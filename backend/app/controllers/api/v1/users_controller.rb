class Api::V1::UsersController < ApplicationController
  def index
    user = User.all.order(id: :desc)
    render json: user
  end
end
