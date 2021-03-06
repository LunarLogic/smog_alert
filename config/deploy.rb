# config valid for current version and patch releases of Capistrano
lock '~> 3.11.2'

set :application, 'smogalert'
set :repo_url, 'git@github.com:LunarLogic/smog_alert.git'
set :user, 'smogalert'

set :deploy_to, '/home/smogalert/application/'

set :rbenv_type, :system

set :rbenv_ruby, '2.6.5'

set :whenever_identifier, -> { "#{fetch(:application)}_#{fetch(:stage)}" }

append :linked_dirs,
       'public/assets',
       'log',
       'tmp/pids',
       'tmp/cache',
       'tmp/sockets',
       'storage'

append :linked_files, 'config/database.yml'

namespace :deploy do
  task :restart do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      execute "sudo systemctl restart #{fetch(:application)}"
    end
  end
end

namespace :sidekiq do
   task :restart do
     on roles(:web), in: :groups, limit: 3, wait: 10 do
       execute "sudo systemctl restart sidekiq"
     end
   end
 end

after 'deploy:publishing', 'deploy:restart'
after 'deploy:publishing', 'sidekiq:restart'
