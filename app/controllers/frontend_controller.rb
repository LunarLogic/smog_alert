# frozen_string_literal: true

class FrontendController < ApplicationController
  def index
    render file: 'public/index.html' if Rails.env.production?
  end

  def health
    render :index
  end
end
