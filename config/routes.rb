FlatTest2::Application.routes.draw do
  devise_for :users

  resources :events, except: [:create, :update] do
    post :create, as: 'create', on: :collection
    put :update, as: 'update', on: :member
  end

  root :to => 'events#index'
end
