Fabricator :survey do
  question { Faker::HipsterIpsum.words(10).join(' ') }

  after_build do |survey|
    survey.answers << Fabricate(:answer)
  end
end
