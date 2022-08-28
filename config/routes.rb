Rails.application.routes.draw do
  resources :courses
  devise_for :users
  root 'home#index'
  get 'home/about'
  get 'home/profile'
end
