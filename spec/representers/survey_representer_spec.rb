require 'spec_helper'

describe SurveyRepresenter do
  let(:survey) { Fabricate(:survey) }
  let(:representer) { survey.extend(SurveyRepresenter) }
  let(:answer) { survey.answers.first }

  let(:expected) do
    {
        id: survey.id,
        question: survey.question,
        answers: survey.answers.map {|a|
          { id: a.id ,
            answer_text: a.answer_text,
            count: a.count }
        }
      }.to_json
  end

  it "returns correct representation of survey" do
    expect(representer.to_json).to eq(expected)
  end

end
