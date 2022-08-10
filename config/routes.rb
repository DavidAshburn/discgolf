Rails.application.routes.draw do
  resources :cards
  resources :variants
  resources :courses
  devise_for :users
  root 'home#index'
  get 'home/about'
  get 'home/profile'
  get 'home/my_courses'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
