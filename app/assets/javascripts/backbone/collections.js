(function(){
  'use strict';

  barberPoll.Collections.AnswerCollection = Backbone.Collection.extend({
    model: barberPoll.Models.Answer,
    clearSelected: function(model){
      $.each(this.models, function(idx, m) {
        if(model.id !== m.id) { m.set('selected', false) };
      });
    }
  });
})();
