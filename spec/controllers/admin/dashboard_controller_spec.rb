require 'rails_helper'

describe Admin::DashboardController do
  describe 'index' do
    it 'renders form successfully' do
      get :index
      expect(response).to be_successful
    end
  end
end
