(function(){
  'use strict';

  barberPoll.Routers.SurveyRouter = Backbone.Router.extend({
    el: function(){
      return this._el;
    },
    initialize: function(opts){
      this._el = opts.el
    },
    routes: {
      '': 'surveyInit',
      ':id': 'voteInit',
      ':id/r': 'resultInit'
    },
    voteInit: function(id){
      new barberPoll.Views.VoteContainerView({
        id: id,
        el: this.el()
      });
    },
    resultInit: function(id){
      new barberPoll.Views.ResultContainerView({
        id: id,
        el: this.el()
      });
    },
    surveyInit: function(){
      var app = new barberPoll.Views.SurveyContainerView({el: this.el()});
      return app.render();
    }
  });
})();
