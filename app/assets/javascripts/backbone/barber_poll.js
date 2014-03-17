window.barberPoll = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

(function() {
  barberPoll.routerInit = function(opts){
    barberPoll.router = new barberPoll.Routers.SurveyRouter({el: opts.el});
    Backbone.history.start()
  };
})();
