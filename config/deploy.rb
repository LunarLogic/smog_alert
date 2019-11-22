# config valid for current version and patch releases of Capistrano
lock "~> 3.11.2"

set :application, "smogalert"
set :repo_url, "git@github.com:LunarLogic/smog_alert.git"
set :user, "smogalert"

set :deploy_to, '/home/smogalert/application/'

set :rbenv_type, :system

set :rbenv_ruby, '2.6.5'

append :linked_dirs,
       'public/assets',
       'log',
       'tmp/pids',
       'tmp/cache',
       'tmp/sockets'

append :linked_files, 'config/database.yml', 'config/master.key', 'config/credentials/staging.key' #, 'config/secrets.yml'

namespace :deploy do
  task :restart do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      execute "sudo systemctl restart #{fetch(:application)}"
    end
  end
end


after 'deploy:publishing', 'deploy:restart'

