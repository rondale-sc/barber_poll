require 'spec_helper'

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
end
