Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index], format: 'json'
      resources :scene_posts, format: 'json'
    end
  end
end
