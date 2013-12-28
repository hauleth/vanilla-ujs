require 'jslint/tasks'

desc "Creates a test rails app for the specs to run against"
task :setup do
  require 'rails/version'
  system("mkdir spec/rails") unless File.exists?("spec/rails")
  system "bundle exec rails new spec/rails/rails-#{Rails::VERSION::STRING} -m spec/support/rails_template.rb"
  #Rake::Task['parallel:after_setup_hook'].invoke
end

desc "Run test server from spec/rails"
task :test_server do
  require 'rails/version'
  rails_root = "spec/rails/rails-#{Rails::VERSION::STRING}"
  gemfile = File.dirname(File.expand_path(__FILE__)) + "/Gemfile"
  Dir.chdir(rails_root) do
    system "BUNDLE_GEMFILE=#{gemfile} ./bin/rake db:migrate"
    system "BUNDLE_GEMFILE=#{gemfile} ./bin/rails s"
  end
end

