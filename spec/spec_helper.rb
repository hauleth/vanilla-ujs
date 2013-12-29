$LOAD_PATH.unshift(File.dirname(__FILE__))
$LOAD_PATH << File.expand_path('../support', __FILE__)

ENV['BUNDLE_GEMFILE'] = File.expand_path('../../Gemfile', __FILE__)
require "bundler"
Bundler.setup

#require 'detect_rails_version'
#ENV['RAILS'] = detect_rails_version

ENV['RAILS'] = '4.0.2'
ENV['RAILS_ENV'] = 'test'
ENV['RAILS_ROOT'] = File.expand_path("../rails/rails-#{ENV['RAILS']}", __FILE__)

# Create the test app if it doesn't exists
unless File.exists?(ENV['RAILS_ROOT'])
  system 'rake setup'
end

require 'rails'
require 'active_record'
#ActiveAdmin.application.load_paths = [ENV['RAILS_ROOT'] + "/app/admin"]

require ENV['RAILS_ROOT'] + '/config/environment'

require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/rails'
require 'capybara/poltergeist'
require 'capybara-screenshot/rspec'

require "phantomjs_quiet"

Capybara.configure do |config|
  config.javascript_driver = :poltergeist
  config.default_driver = :poltergeist
end
