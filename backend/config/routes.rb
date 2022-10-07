Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index], format: 'json'
      resources :scene_posts, format: 'json'
    end
  end
end
