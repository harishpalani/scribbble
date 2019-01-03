Rails.application.routes.draw do
  resources :shots
  devise_for :users, controller: { registrations: 'registrations' }
  root 'home#index'
end
