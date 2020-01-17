require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'frontend#index'
  get '/health', to: 'frontend#health'

  namespace :admin do
    root to: 'dashboard#index'
    resources :locations do
      get :search, on: :collection
      post :save, on: :collection
    end
    resources :articles do
      member do
        patch :publish
        put :publish
      end
    end
    resources :users
  end

  authenticate :user, ->(u) { u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  namespace :api do
    namespace :internal do
      resources :measurements, only: [] do
        collection do
          get :current
          get :calendar_values
          get :calendar_status
        end
      end
    end
  end

  get '*path', to: 'frontend#index'
end
