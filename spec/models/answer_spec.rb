require 'spec_helper'

describe Answer do
  describe "can_vote?" do
    context "when survey is NOT permissive" do
      let(:survey) { Fabricate(:survey, permissive_voting: false) }
      let(:answer) { Fabricate(:answer, survey: survey) }

      context "When key is found in redis" do
        it "is false" do
          allow(answer).to receive(:voted_recently?).and_return(true)


          expect(answer.can_vote?("127.0.0.1")).to be(false)
        end
      end

      context "when key is not found in redis" do
        it "is true" do
          allow(answer).to receive(:voted_recently?).and_return(false)
          allow(answer).to receive(:register_vote)

          expect(answer.can_vote?("127.0.0.1")).to be(true)
        end
      end
    end

    context "when survey is permissive" do
      let(:survey) { Fabricate(:survey, permissive_voting: true) }
      let(:answer) { Fabricate(:answer, survey: survey) }

      it "is true" do
        allow(answer).to receive(:voted_recently?).and_return(true)

        expect(answer.can_vote?("127.0.0.1")).to be(true)
      end
    end
  end

  describe "vote" do
    let(:answer) { Fabricate(:answer, count: 1) }
    let(:redis_cache) { double(publish_answers: true) }

    before do
      allow(answer).to receive(:redis_cache).and_return(redis_cache)
    end

    it "increments the count by 1" do
      answer.vote
      expect(answer.reload.count).to eq(2)
    end
  end
end
