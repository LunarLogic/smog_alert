# https://stackoverflow.com/a/22233540/905697
namespace :deploy do
  desc 'Runs rake db:seed for SeedMigrations data'
  task seed: [:set_rails_env] do
    on primary fetch(:migration_role) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, 'db:seed'
        end
      end
    end
  end

  # Comment out below line. We don't want to run seeds automatically during deployment
  # after 'deploy:migrate', 'deploy:seed'
end
