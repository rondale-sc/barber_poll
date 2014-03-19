(function() {
  'use strict';

  barberPoll.Models.Survey = Backbone.Model.extend({
    urlRoot: '/surveys',
    defaults: {
      question: ''
    },
    initialize: function(opts) {
      this._answers = new barberPoll.Collections.AnswerCollection();
    },
    answers: function() {
      return this._answers;
    },
    toJSON: function() {
      var answersAttributes = { "answers_attributes":
        this.answers().map(function(model) {
          if(model.hasAnswerText()) {
            return _.clone(model.abbreviatedAttributes());
          }
        })
      };
      return { "survey": _.extend(_.clone(this.attributes), answersAttributes)};
    }
  });

  barberPoll.Models.Answer = Backbone.Model.extend({
    abbreviatedAttributes: function(){
      return {
        "answer_text": this.get("answer_text"),
        "selected": this.get("selected"),
        "id": this.id
      };
    },
    hasAnswerText: function(){
      return !!this.get('answer_text')
    }
  });

})();
