# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :application, "geofind_gameserver"
set :repo_url, "git@github.com:posixpascal/geofind_gameserver.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/geofind/app/"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true
# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/geofind/app/"
after 'deploy', 'npm:install'
after 'deploy', 'pm2:restart'
require "json"
namespace :pm2 do

  def app_status
    within current_path do
      ps = JSON.parse(capture :pm2, :jlist, fetch(:app_command))
      if ps.empty?
        return nil
      else
        # status: online, errored, stopped
        return ps[0]["pm2_env"]["status"]
      end
    end
  end

  def restart_app
    within current_path do
      execute :pm2, :delete, 0
      execute :pm2, :start, "dist/server.js"
      execute :pm2, :restart, 0
    end
  end

  def start_app
    within current_path do
      execute :pm2, :stop, 0
    end
  end

  desc 'Restart app gracefully'
  task :restart do
    on roles(:app) do
      case app_status
      when nil
        info 'App is not registerd'
        start_app
      when 'stopped'
        info 'App is stopped'
        restart_app
      when 'errored'
        info 'App has errored'
        restart_app
      when 'online'
        info 'App is online'
        restart_app
      end
    end
  end

end

namespace :npm do

  desc "START the servers"
  task :install do
    on roles(:app) do
      execute "cd /home/geofind/app/current/ && npm install"
      execute "cd /home/geofind/app/current/ && npm run build || true"
    end
  end
end


# Default value for :linked_files is []
append :linked_files, ".env"

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
