# frozen_string_literal: true

class FrontendController < ApplicationController
  def health
    render :index
  end
end
