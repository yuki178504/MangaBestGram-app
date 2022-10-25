Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :user do
        resources :comics
        resources :scene_posts
      end
      resources :users
      resources :comics, only: [:index] do
        collection do
          get 'latest'
        end
      end
    end
  end
end
