namespace :fixes do
  desc 'Add missing authors to previosly created articles'
  task add_authors_to_articles: :environment do
    puts 'Start adding users to articles:'
    author_ids = User.ids
    Article.where(user_id: nil).each do |article|
      # rubocop:disable Rails/SkipsModelValidations
      article.update_attribute(:user_id, author_ids.sample)
      # rubocop:enable Rails/SkipsModelValidations
    end
  end
end
