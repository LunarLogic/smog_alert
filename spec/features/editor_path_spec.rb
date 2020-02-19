require 'rails_helper'

def add_new_article(article)
  fill_in 'Tytuł', with: article.title
  fill_in 'Skrót artykułu', with: article.overview
  find('#article_body').click.set article.body
  click_on('Dodaj')
end

describe 'editor navigating the admin panel' do
  let!(:location) { FactoryBot.create(:location) }
  let!(:user) { FactoryBot.create(:user) }
  let!(:article) { FactoryBot.create(:article, user: user) }
  let!(:organization) { FactoryBot.create(:organization) }

  before :each do
    editor = FactoryBot.create(:editor)
    login_as(editor)
  end

  scenario 'editor cannot delete a locaction' do
    visit admin_locations_path
    within('.location-row', text: location.name) do
      click_on('Usuń')
      accept_confirm("Czy na pewno chcesz usunąć lokalizację #{location.name}?")
    end
    expect(page).to have_current_path(admin_locations_path)
    expect(page).to have_content(location.name)
    expect(page).to have_content('Nie masz uprawnień do wykonania tego zadania')
  end

  scenario 'editor cannot edit a user' do
    visit admin_users_path
    within('.user-row', text: user.email) do
      click_on('Edytuj')
    end
    expect(page).to have_current_path(admin_users_path)
    expect(page).to have_content('Nie masz uprawnień do wykonania tego zadania')
  end

  scenario 'editor can create an article' do
    visit admin_articles_path
    click_on('new-article')
    expect(page).to have_current_path(new_admin_article_path)
    add_new_article(article)
    expect(page).to have_current_path(admin_articles_path)
    expect(page).to have_content(article.title)
  end

  scenario 'editor cannot publish an article' do
    visit admin_articles_path
    within('.article-row', text: article.title) do
      click_on 'Opublikuj wpis'
    end
    expect(page).to have_current_path(admin_articles_path)
    expect(page).to have_content('Nie masz uprawnień do wykonania tego zadania')
  end

  scenario 'editor cannot delete an organization' do
    visit admin_organization_path(organization)
    click_on('Usuń')
    accept_confirm("Czy na pewno chcesz usunąć organizację #{organization.organization_name}?")
    expect(page).to have_current_path(admin_organization_path(organization))
    expect(page).to have_content('Nie masz uprawnień do wykonania tego zadania')
  end
end
