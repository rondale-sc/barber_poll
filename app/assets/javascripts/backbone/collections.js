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
    clearSelected: function(excluded_model){
      this.forEach(function(model) {
        if(excluded_model !== model) {
          model.set('selected', false)
        };
      })
    },
    dataForPieChart: function(){
      var self = this;
      return this.map(function(model) {
        return {
          "value": model.get('count'),
          "color": model.get('color')
        }
      });
    }
  });
})();
