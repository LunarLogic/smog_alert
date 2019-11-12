# frozen_string_literal: true

class FrontendController < ApplicationController
  def index
    if Rails.env.production?
      render file: 'public/index.html'
    end
  end
end
