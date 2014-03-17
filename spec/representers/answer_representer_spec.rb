require 'spec_helper'

describe AnswerRepresenter do
  let(:answer) { Fabricate(:answer) }
  let(:representer) { answer.extend(AnswerRepresenter) }

  let(:expected) do
    {
        id: answer.id,
        answer_text: answer.answer_text,
        count: 0
      }.to_json
  end

  it "returns correct representation of answer" do
    expect(representer.to_json).to eq(expected)
  end
end
