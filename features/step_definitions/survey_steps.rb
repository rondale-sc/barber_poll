Then(/^I see that my survey has been created$/) do
  wait_for_ajax
  survey = Survey.last
  expect(survey.question).to eq("Favorite Color?")
  survey.answers.each do |answer|

    expect(["Blue", "Red"]).to include(answer.answer_text)
  end
end

Then(/^I fill in the survey form$/) do
  within("#survey_new") do
    fill_in "question", with: "Favorite Color?"
    fill_in "answer_1", with: "Blue"
    fill_in "answer_2", with: "Red"
  end
end

When(/^I vote for red$/) do
  # kinda gnarly work around because of the pseudo element overlay
  # causing capybara to bark (overlapping element error) at a normal click
  page.execute_script("""
    $('input').last().click()
  """)

  click_link "Vote"
end

When /^I visit the vote page for that survey$/ do
  visit "/#{@survey.id}"
end

Then /^I should be directed to the results$/ do
  wait_for_ajax
  current_path = URI.parse(current_url).path
  expect(current_path).to eq("/#{@survey.id}/r")
end

Then /^I should see the answer I voted for counted$/ do
  within(:xpath, '//li[contains(., "Red")]') do
    expect(page.body).to have_content("100%")
  end
end
