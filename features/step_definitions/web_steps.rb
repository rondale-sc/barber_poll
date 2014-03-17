When /^I click "(.*)"$/ do |button_text|
  click_button button_text
end

When /^I follow "(.*)"$/ do |link_text|
  click_link link_text
end

When /^(?:|I )fill in "([^"]*)" with "([^"]*)"$/ do |field, value|
  fill_in(field, :with => value)
end

When /^(?:|I )fill in the following within the "(.+)" id:$/ do |id, fields|
  within(id) do
    fields.rows_hash.each do |name, value|
      step %{I fill in "#{name}" with "#{value}"}
    end
  end
end

When /^(?:|I )fill in the following within the "(.+)" fieldset:$/ do |fieldset, fields|
  within_fieldset(fieldset) do
    fields.rows_hash.each do |name, value|
      step %{I fill in "#{name}" with "#{value}"}
    end
  end
end

When /^(?:|I )fill in the following:$/ do |fields|
  @form_attributes = fields.rows_hash
  fill_in_with_table(fields)
end

When /^(?:|I )select "([^"]*)" from "([^"]*)" within the "(.+)" id$/ do |value, field, id|
  within(:css, id) do
    begin
      select(value, :from => field)
    rescue Capybara::ElementNotFound
      select(value, from: field, visible: false)
    end
  end
end

When /^(?:|I )select "([^"]*)" from "([^"]*)"$/ do |value, field|
  select(value, :from => field)
end

When /^(?:|I )select "([^"]*)" from the "([^"]*)" Chosen select$/ do |value, field|
  select(value, :from => field, visible: false)
end

When /^(?:|I )choose "([^"]*)"$/ do |field|
  choose(field)
end

When /^(?:|I )press "([^"]*)"$/ do |button|
  click_button(button)
end

When /^(?:|I )check "([^"]*)"$/ do |box|
  check(box)
end

When(/^I uncheck "(.*?)"$/) do |box|
  uncheck(box)
end

Then /^(?:|I )should see "([^"]*)"$/ do |text|
  if page.respond_to? :should
    page.should have_content(text)
  else
    assert page.has_content?(text)
  end
end

Then /^I should not see "(.*?)"$/ do |text|
  expect(page).to have_no_content(text)
end

Then /^(?:|I )should be redirected to edit account for user$/ do
  current_path = URI.parse(current_url).path
  current_path.should == edit_account_path(@user)
end

Then /^(?:|I )should be on (.+)$/ do |page_name|
  current_path = URI.parse(current_url).path
  if current_path.respond_to? :should
    current_path.should == path_to(page_name)
  else
    assert_equal path_to(page_name), current_path
  end
end

Then /^I should see a (\d+) error$/ do |status|
  page.driver.status_code.should == status.to_i
end

Then /^I should see the following content on the page:$/ do |content|
  content.rows.flat_map do |row|
    row.each do |cell|
      expect(page).to have_content(cell)
    end
  end
end

Then "I see the expected changes from that form" do
  @form_attributes.each do |key, value|
    expect(page).to have_content(value)
  end
end
