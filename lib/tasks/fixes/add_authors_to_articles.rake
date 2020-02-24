namespace :fixes do
  desc 'Add missing authors to previosly created articles'
  task add_authors_to_articles: :environment do
    puts 'Start adding users to articles:'
    authors_id = User.ids
    Article.where(user_id: nil).each do |article|
      puts article.id
      article.user_id = authors_id.sample
      puts "after #{article.user_id}"      
      # article.save!
    end
  end
end
