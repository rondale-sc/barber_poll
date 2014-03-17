(function(){
  'use strict';

  barberPoll.Collections.AnswerCollection = Backbone.Collection.extend({
    model: barberPoll.Models.Answer,
    comparator: function(collection) {
      return( collection.get('id') );
    },
    clearSelected: function(model){
      $.each(this.models, function(idx, m) {
        if(model.id !== m.id) { m.set('selected', false) };
      });
    }
  });
})();
