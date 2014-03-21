require 'spec_helper'

describe AnswerIncrementer do
  let(:answers) do
    [
      {"id"=>92,
        "answer_text"=>"Friends",
        "selected"=>true,
        "count"=>0},
      {"id"=>93,
          "answer_text"=>"How I met your mother",
          "selected"=>false,
          "count"=>0},
      {"id"=>94,
          "answer_text"=>"Sienfeld",
          "selected"=>false,
          "count"=>0}
    ]
  end

  let(:requestor_ip) { "127.0.0.1" }
  describe "selected_answer" do
    context "It returns first selected answer" do
      it "returns first where selected is true" do
        ai = described_class.new(answers, requestor_ip, double.as_null_object)
        expect(ai.selected_answer["id"]).to eq(92)
      end

      context  "doesn't blow up when given a bad answers" do
        it "works" do
          ai = described_class.new([{"no_selected"=>"something"}], requestor_ip)
          expect { ai.selected_answer }.not_to raise_error
        end

        it "works" do
          ai = described_class.new(nil, requestor_ip)
          expect { ai.selected_answer }.not_to raise_error
        end
      end
    end
  end

  describe "save" do
    context "when user can vote" do
      before do
        allow_any_instance_of(Answer).to receive(:can_vote?).and_return(true)
      end

      it "increments and persists the selected answer" do
        answer = Fabricate(:answer)
        answers = [
          {"id"=>answer.id,
          "answer_text"=>"Sienfeld",
          "selected"=>true,
          "count"=>0}
        ]

        described_class.new(answers, requestor_ip).save
        expect(answer.reload.count).to eq(1)
      end

      it "returns false if it cannot find an selected answer" do
        answers = [
          {"id"=>400,
          "answer_text"=>"Sienfeld",
          "selected"=>true,
          "count"=>0}
        ]
        answer_class = double(find_by: nil)
        ai = described_class.new(answers, requestor_ip, answer_class)
        expect(ai.save).to be(false)
      end
    end

    context "when use cannot vote" do
      it "returns false when answer doesn' allow vote" do
        answers = [
          {"id"=>400,
          "answer_text"=>"Sienfeld",
          "selected"=>true,
          "count"=>0}
        ]
        answer = double(can_vote?: false)
        answer_class = double(find_by: answer)
        ai = described_class.new(answers, requestor_ip, answer_class)
        expect(ai.save).to be(false)
      end
    end
  end
end
