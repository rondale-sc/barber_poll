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
