Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :scene_posts
      resources :accounts, only: %i[update show]
    end
  end
end
