Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'frontend#index'
  get '/health', to: 'frontend#health'

  namespace :admin do
    root to: 'dashboard#index'
    resources :locations
  end
end
