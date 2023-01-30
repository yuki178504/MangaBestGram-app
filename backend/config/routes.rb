Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :user do
        resources :users, only: [:index, :update, :show]
        resources :comics, shallow: true do
          collection do
            get 'scene_post_count'
          end
          resources :scene_posts, shallow: true do
            resources :comments, only: [:index, :create, :destroy]
          end
        end
        resources :favorites, only: [:index, :create, :destroy]
      end
      namespace :general do
        resources :comics, only: [:index], shallow: true do
          resources :scene_posts, only: [:index, :show]
        end
      end
      resources :users, only: [:index, :show], shallow: true do
        resources :user_comics, only: [:index] do
          collection do
            get 'scene_post_count'
          end
        end
      end
      get 'favorites_ranking', to: 'favorites_ranking#favorites_ranking'
      resources :comics, only: [:index, :show], shallow: true do
        resources :scene_posts, only: [:index, :show], shallow: true do
          resources :comments, only: [:index] do
            collection do
              get 'favorites_count'
            end
          end
        end
        collection do
          get 'latest'
        end
      end
    end
  end
end
