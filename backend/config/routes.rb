Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :user do
        resources :users, only: [:index, :update, :show]
        resources :comics, shallow: true do
          resources :scene_posts
        end
        resources :favorites, only: [:create, :destroy]
      end
      resources :users
      resources :comics, only: [:index, :show], shallow: true do
        resources :scene_posts, only: [:index, :show]
        collection do
          get 'latest'
        end
      end
    end
  end
end
