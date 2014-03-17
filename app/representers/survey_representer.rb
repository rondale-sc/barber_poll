module SurveyRepresenter
  include Roar::Representer::JSON

  property :id
  property :question

  collection :answers, extend: AnswerRepresenter, class: Answer
end
