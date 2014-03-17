BarberPoll::Application.routes.draw do
  resources :surveys, only: [:new, :create, :update, :show] do
    resources :answers, only: [:index]
  end

  root 'surveys#new'
end
