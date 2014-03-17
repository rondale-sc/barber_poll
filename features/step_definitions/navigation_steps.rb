require Rails.root.join("features/support/paths.rb")

Given /^I am on (.*)$/ do |path_name|
  visit path_to(path_name)
end

Given /^I am taken to (.*)$/ do |page_name|
  expect(page.current_path).to eq(path_to(page_name))
end

When "I return to the page" do
  visit current_path
end

Given /^I go to (.*)$/ do |path_name|
  visit path_to(path_name)
end

Given /^I visit "(.+)"$/ do |url|
  visit url
end
