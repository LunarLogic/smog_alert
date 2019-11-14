# config valid for current version and patch releases of Capistrano
lock "~> 3.11.2"

set :application, "smogalert"
set :repo_url, "git@github.com:LunarLogic/smog_alert.git"
set :user, "smogalert"

set :deploy_to, '/home/smogalert/application/'
set :rails_env, 'production'

set :rbenv_type, :system

set :rbenv_ruby, '2.6.5'

append :linked_dirs,
       'public/assets',
       'log',
       'tmp/pids',
       'tmp/cache',
       'tmp/sockets'

append :linked_files, 'config/database.yml', 'config/master.key' #, 'config/secrets.yml'

namespace :deploy do
  task :restart do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      execute "sudo systemctl restart #{fetch(:application)}"
    end
  end
end

namespace :frontend do
  desc 'Installs, builds and serves frontend'
  task :run do
    on roles(:web) do
      within "#{fetch(:release_path)}/frontend" do
        execute :yarn, '--quiet install'
        execute :yarn, 'run build'
      end
      within fetch(:release_path).to_s do
        execute :cp, '-a frontend/build/. public/'
      end
    end
  end
end

before 'deploy:publishing', 'frontend:run'
after 'deploy:publishing', 'deploy:restart'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
