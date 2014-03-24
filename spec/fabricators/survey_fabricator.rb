Fabricator :survey do
  question { Faker::HipsterIpsum.words(10).join(' ') }

  answers(count: 2)
end

Fabricator :favorite_color_survey, class_name: Survey do
  question "What is your favorite color?"

  after_build do |survey|
    survey.answers << Fabricate(:answer, answer_text: "Blue")
    survey.answers << Fabricate(:answer, answer_text: "Red")
  end
end
