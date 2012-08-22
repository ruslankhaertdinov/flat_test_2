FlatTest2::Application.routes.draw do
  devise_for :users

  resources :events, except: [:create, :update] do
    collection do
      post :create, as: 'create'
    end

    member do
      put :update, as: 'update'
    end
  end

  root :to => 'events#index'

end
