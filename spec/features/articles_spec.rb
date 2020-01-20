require 'rails_helper'

def add_new_article(article)
  fill_in 'Title', with: article.title
  find('#article_body').click.set article.body
  click_on('Create Article')
end

describe 'admin interactions with articles' do
  let!(:article) { FactoryBot.create(:article) }
  let!(:new_article) { FactoryBot.build(:article) }

  before :each do
    user = FactoryBot.create(:superadmin)
    login_as(user, scope: :user)
    visit admin_articles_path
  end

  scenario 'verify if table with articles exist' do
    expect(page).to have_table('articles')
  end

  scenario 'verify if there is a link to add new article' do
    expect(page).to have_link('Dodaj wpis')
  end

  scenario 'add new article' do
    click_on('new-article')
    expect(page).to have_current_path(new_admin_article_path)
    add_new_article(new_article)
    expect(page).to have_current_path(admin_articles_path)
    expect(page).to have_content(new_article.title)
  end

  scenario 'edit an article' do
    within('.article-row', text: article.title) do
      click_on('Edytuj')
    end
    expect(page).to have_current_path(edit_admin_article_path(article))
    fill_in 'Title', with: 'edited title'
    click_on('Update Article')
    expect(page).to have_current_path(admin_articles_path)
    expect(page).to have_content('edited title')
  end

  scenario 'publish an article' do
    within('.article-row', text: article.title) do
      click_on('Opublikuj wpis')
    end
    expect(page).to have_current_path(admin_articles_path)
    expect(page).not_to have_content('Opublikuj wpis')
  end

  scenario 'delete an article' do
    within('.article-row', text: article.title) do
      click_on('Usuń')
      accept_confirm("Czy na pewno chcesz usunąć wpis #{article.title}?")
    end
    expect(page).to have_current_path(admin_articles_path)
    expect(page).not_to have_content(article.title)
  end
end
