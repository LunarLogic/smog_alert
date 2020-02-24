namespace :fixes do
  desc 'Add missing authors to previosly created articles'
  task add_authors_to_articles: :environment do
    puts 'Start adding users to articles:'
    author_ids = User.ids
    Article.where(user_id: nil).each do |article|
      article.user_id = author_ids.sample
      article.save!
    end
  end
end
