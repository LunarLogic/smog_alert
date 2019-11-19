require 'rails_helper'

describe '/admin/dashboard' do
  describe 'GET / (main page of admin panel)' do
    context 'when user signed in' do
      it 'allows user to the admin panel' do
        user = User.create(email: 'test@test.com', password: 'password', password_confirmation: 'password')
        user.confirm
        sign_in user
        get admin_root_path
        expect(response).to be_successful
      end
    end

    context 'when user is not signed in' do
      it 'redirects to sign in page' do
        get admin_root_path
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
