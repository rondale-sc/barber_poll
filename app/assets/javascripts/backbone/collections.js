(function(){
  'use strict';

  barberPoll.Collections.AnswerCollection = Backbone.Collection.extend({
    initialize: function(){
      this.on('add change:count', this.calculatePercentage);
    },
    model: barberPoll.Models.Answer,
    comparator: function(collection) {
      return( collection.get('id') );
    },
    calculatePercentage: function(){
      var total = this.totalVotes();

      this.forEach(function(model){
        model.set('percentage', (model.get('count') / total))
      });
    },
    totalVotes: function(){
      return this.reduce(function(m, model) { return m + model.get('count') }, 0);
    },
    clearSelected: function(model){
      $.each(this.models, function(idx, m) {
        if(model.id !== m.id) { m.set('selected', false) };
      });
    }
  });
})();
