require 'rails_helper'
require 'database_cleaner'

DatabaseCleaner.strategy = :transaction

describe '/admin/dashboard' do
  describe 'GET / (main page of admin panel)' do
    DatabaseCleaner.cleaning do
      context 'when an admin signed in' do
        it 'allows user to the admin panel' do
          user = FactoryBot.create(:admin)
          sign_in user
          get admin_root_path
          expect(response).to be_successful
        end
      end
    end

    context 'when user is not signed in' do
      it 'redirects to sign in page' do
        get admin_root_path
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    DatabaseCleaner.cleaning do
      context 'when user is not an admin' do
        it 'redirects to the root' do
          user = FactoryBot.create(:user)
          sign_in user
          get admin_root_path
          expect(response).to redirect_to(root_path)
        end
      end
    end
  end
end
