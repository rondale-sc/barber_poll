require 'spec_helper'
require 'json'

describe RedisCache do
  describe "voted_recently?" do
    it "is true when key is found" do
      cache = {"thing" => "true"}
      rc = described_class.new(cache: cache)

      expect(rc.voted_recently?("thing")).to eq(true)
    end
  end

  describe "register_vote" do
    it "sets a key and expiry" do
      cache = {}

      expect(cache).to receive(:set).with("thing", true)
      expect(cache).to receive(:expireat).with("thing", 2.hours.from_now.to_i)

      rc = described_class.new(cache: cache)
      rc.register_vote("thing")
    end
  end

  describe "publish_answers" do
    it "publishes" do
      cache = double(:publish)
      survey_id = 111
      answers = [
        double(id: 229, answer_text: "Foo", count: 1),
        double(id: 227, answer_text: "Bar", count: 2),
        double(id: 228, answer_text: "Baz", count: 5)
      ]

      expected = {
        survey_id: survey_id,
        answers: answers
      }.to_json

      expect(cache).to receive(:publish).with("survey_channel", expected)

      rc = described_class.new(cache: cache)
      rc.publish_answers(survey_id, answers)
    end
  end
end
