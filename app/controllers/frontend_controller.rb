# frozen_string_literal: true

class FrontendController < ApplicationController
  def index
    render file: 'public/index.html'
  end
end
