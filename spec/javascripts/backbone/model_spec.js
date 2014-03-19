//= require 'spec_helper'

describe("barberPoll.Models.Survey", function(){
  var survey;
  beforeEach(function(){
    survey = new barberPoll.Models.Survey
  });

  describe("toJSON", function(){
    var results = {
      "survey":
        {
          "question": "Favorite Color?",
          "answers_attributes": [
            {"answer_text": "Blue"},
            {"answer_text": "Red"}
          ]
        }
    }

    it("renders the appropriate json", function(){
      survey.set("question", "Favorite Color?");
      survey.answers().add({"answer_text": "Blue"});
      survey.answers().add({"answer_text": "Red"});

      expect(survey.toJSON()).toEqual(results)
    });
  });
});

describe("barberPoll.Models.Answer", function(){
  var answer;
  beforeEach(function(){
    answer = new barberPoll.Models.Answer();
  });

  describe("hasAnswerText", function(){
    it("is true when answer text is present", function(){
      answer.set("answer_text", "Foo");
      expect(answer.hasAnswerText()).toBe(true);
    });
  });

  describe("setColor", function(){
    it("sets color to the output from colorGenerator", function(){
      spyOn(answer, 'colorGenerator').andCallFake(function(){
        return 'Foo';
      });
      answer.setColor();

      expect(answer.get('color')).toEqual('Foo');
    });
  });

  describe("abbreviatedAttributes", function(){
    it("returns an formatted object for consumption by backend", function(){
      var answer = new barberPoll.Models.Answer({
        answer_text: "Blue",
        selected: true,
        id: 1
      });

      var results = {
        answer_text: "Blue",
        selected: true,
        id: 1
      };

      expect(answer.abbreviatedAttributes()).toEqual(results);
    });
  });
});
