require 'cucumber/rails'
ActionController::Base.allow_rescue = false

Capybara.default_selector = :css
Capybara.javascript_driver = :webkit

begin
  DatabaseCleaner.strategy = :transaction
rescue NameError
  raise "You need to add database_cleaner to your Gemfile (in the :test group) if you wish to use it."
end

if(ENV['FAILFAST'])
  After do |s|
    Cucumber.wants_to_quit = true if s.failed?
  end
end

Cucumber::Rails::Database.javascript_strategy = :truncation

