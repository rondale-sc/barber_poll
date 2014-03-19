//= require 'spec_helper'

describe("barberPoll.Collections.AnswerCollection", function(){
  var collection;

  beforeEach(function(){
    collection = new barberPoll.Collections.AnswerCollection();
  });

  describe("calculatePercentage", function(){

    it("caclutes percentages based on answer count", function(){
      var data = [
        {answer_text: "Blue", count: 1},
        {answer_text: "Red", count: 2}
      ]

      // add triggers calculatePercentage
      $.each(data, function(index, model) { collection.add(model) });

      var blue = collection.findWhere({answer_text: "Blue"});
      var red = collection.findWhere({answer_text: "Red"});

      expect(red.attributes.percentage.toFixed(2)).toBeCloseTo('0.66', 1);
      expect(blue.attributes.percentage.toFixed(2)).toBeCloseTo('0.33', 1);
    });
  });

  describe("totalVotes", function(){
    it("sums total count of votes", function(){
      var data = [
        {answer_text: "Blue", count: 1},
        {answer_text: "Red", count: 2}
      ]

      $.each(data, function(index, model) { collection.add(model) });
      expect(collection.totalVotes()).toEqual(3);
    });
  });

  describe("clearSelected", function(){
    it("sets all models selected attribute to false except its argument model", function(){
      var data = [
        {answer_text: "Blue"},
        {answer_text: "Red"},
        {answer_text: "Green"}
      ]

      $.each(data, function(index, model) { collection.add(model) });
      var blue = collection.findWhere({answer_text: "Blue"});
      blue.set('selected', true);

      collection.clearSelected(blue);

      expect(blue.attributes.selected).toBeTruthy();
      expect(collection.models[1].attributes.selected).toBe(false);
      expect(collection.models[2].attributes.selected).toBe(false);
    });
  });
});
