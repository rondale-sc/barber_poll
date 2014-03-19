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
    fill_in "answer 1", with: "Blue"
    fill_in "answer 2", with: "Red"
  end
end

When(/^I vote for red$/) do
  find(:xpath, '//p[contains(.,"Red")]/input').click
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
    expect(page.body).to have_content("(100%)")
  end
end
