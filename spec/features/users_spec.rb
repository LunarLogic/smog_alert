require 'rails_helper'

def add_new_user(user)
  fill_in 'Adres email', with: user.email
  fill_in 'Hasło', with: user.password
  click_on('Utwórz użytkownika')
end

describe 'admin managing users of the application' do
  let!(:user) { FactoryBot.create(:user) }
  let!(:user_new) { FactoryBot.build(:user) }

  before :each do
    admin = FactoryBot.create(:superadmin)
    login_as(admin)
    visit admin_users_path
  end

  scenario 'verify that the table with users exists' do
    expect(page).to have_table('users')
  end

  scenario 'verify there is a link to adding a new user' do
    expect(page).to have_link('Dodaj użytkownika')
  end

  scenario 'add new user' do
    click_on('new-user')
    expect(page).to have_current_path(new_admin_user_path)
    add_new_user(user_new)
    expect(page).to have_content(user_new.email)
  end

  scenario 'edit a user' do
    within('.user-row', text: user.email) do
      click_on('Edytuj')
    end
    expect(page).to have_current_path(edit_admin_user_path(user))
    check('Czy użytkownik jest adminem?')
    click_on 'Zapisz zmiany'
    expect(page).to have_current_path(admin_users_path)
    expect(page).to have_content('tak')
  end

  scenario 'delete a user' do
    within('.user-row', text: user.email) do
      click_on('Usuń')
      accept_confirm("Czy na pewno chcesz usunąć użytkownika #{user.email}?")
    end
    expect(page).to have_current_path(admin_users_path)
    expect(page).not_to have_content(user.email)
  end
end
