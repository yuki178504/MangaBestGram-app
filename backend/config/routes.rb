Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :scene_posts
      resources :users
    end
  end

  namespace :api do
    namespace :v1 do
      namespace :user do
        resources :comics
      end
    end
  end
end
