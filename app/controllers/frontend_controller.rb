# frozen_string_literal: true

class FrontendController < ApplicationController
  def index
    if Rails.env.production?
      render file: 'public/index.html'
    else
      render plain: "In development please use npm start and visit localhost:3000."
    end
  end
end
