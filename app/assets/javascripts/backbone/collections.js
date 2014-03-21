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
        var count = model.get('count');
        var percentage = (total == 0) ? total : (count / total);
        model.set('percentage', percentage);
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
          "label": model.get('answer_text')
        }
      });
    }
  });
})();
