namespace :fixes do
  desc 'Add missing authors to previosly created articles'
  task add_author_to_article: :environment do
    puts 'Start adding users to articles:'
    Article.all.each do |article|
      puts article.id
      article.user_id = [editor.id, superadmin.id].sample if article.user_id.nil?
      article.save!
    end
  end
end
