Fabricator :survey do
  question { Faker::HipsterIpsum.words(10).join(' ') }

  after_build do |survey|
    survey.answers << Fabricate(:answer)
  end
end

Fabricator :favorite_color_survey, class_name: :survey do
  question "What is your favorite color?"

  after_build do |survey|
    survey.answers << Fabricate(:answer, answer_text: "Blue")
    survey.answers << Fabricate(:answer, answer_text: "Red")
  end
end
