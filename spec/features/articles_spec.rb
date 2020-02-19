require 'rails_helper'

def add_new_article(article)
  fill_in 'Tytuł', with: article.title
  find('#article_body').click.set article.body
  click_on('Dodaj')
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

  context 'add new article' do
    before :each do
      click_on('new-article')
    end

    scenario 'create new article' do
      expect(page).to have_current_path(new_admin_article_path)
      add_new_article(new_article)
      expect(page).to have_current_path(admin_articles_path)
      expect(page).to have_content(new_article.title)
    end

    scenario 'add tag field' do
      click_on('Dodaj tag')
      expect(page.has_selector?('.tag-field')).to be true
    end

    scenario 'remove tag fields' do
      click_on('Dodaj tag')
      expect(page.has_selector?('.tag-field')).to be true
      click_on(class: 'close')
      expect(page.has_selector?('.tag-field')).to be false
    end

    scenario 'create new article with tags' do
      fill_in 'Tytuł', with: 'New article with tags'
      find('#article_body').click.set article.body
      click_on('Dodaj tag')
      find('.tag-field input').set 'Zabierzów'
      click_on('Dodaj')
      click_on('New article with tags')
      expect(page).to have_content('Zabierzów')
    end
  end

  context 'edit an article' do
    before :each do
      article.tags.build(name: 'smog')
      article.save!
      within('.article-row', text: article.title) do
        click_on('Edytuj')
      end
    end

    scenario 'edit an article' do
      expect(page).to have_current_path(edit_admin_article_path(article))
      fill_in 'Tytuł', with: 'edited title'
      click_on('Zapisz')
      expect(page).to have_current_path(admin_articles_path)
      expect(page).to have_content('edited title')
    end

    scenario 'check if tags are present' do
      expect(page.has_selector?('.tag-field input')).to be true
    end

    scenario 'remove tag' do
      click_on(class: 'close')
      expect(page.has_selector?('.tag-field input')).to be false
      click_on('Zapisz')
      expect(article.tags.empty?).to be true
    end
  end

  scenario 'publish an article' do
    within('.article-row', text: article.title) do
      click_on('Opublikuj wpis')
    end
    expect(page).to have_current_path(admin_articles_path)
    expect(page).not_to have_content('Opublikuj wpis')
  end

  scenario 'unpublish an article' do
    within('.article-row', text: article.title) do
      click_on('Opublikuj wpis')
      click_on('Cofnij publikację')
    end
    expect(page).to have_current_path(admin_articles_path)
    expect(page).to have_content('Nieopublikowany')
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
