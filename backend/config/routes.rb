Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :scene_posts
      resources :users
      resources :comics
    end
  end
end
