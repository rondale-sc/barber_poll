//= require spec_helper

describe("barberPoll.Routers.SurveyRouter", function(){
  var router, pushStateSpy;
  beforeEach(function(){
    router = new barberPoll.Routers.SurveyRouter({el: $('#survey_new')});
    Backbone.history.start({pushState: true, hashChange: false})
  });

  afterEach(function(){
    Backbone.history.stop();
  });

  it('has a "surveyInit" route', function () {
    expect(router.routes['']).toEqual('surveyInit');
  });

  it('has a "voteInit" route', function () {
    expect(router.routes[':id']).toEqual('voteInit');
  });

  it('triggers the "surveyInit" route', function () {
      var surveyInit = spyOn(router, 'surveyInit').andCallThrough();
      pushStateSpy = spyOn(window.history, 'pushState').andCallFake(function (data, title, url) {
          expect(url).toEqual('/');
          router.surveyInit();
      });
      router.navigate('');
      expect(pushStateSpy).toHaveBeenCalled();
      expect(surveyInit).toHaveBeenCalled();
  });

  it('triggers the "voteInit" route', function () {
      var voteInit = spyOn(router, 'voteInit').andCallThrough();
      pushStateSpy = spyOn(window.history, 'pushState').andCallFake(function (data, title, url) {
          expect(url).toEqual('/2');
          router.voteInit();
      });
      router.navigate('/2');
      expect(pushStateSpy).toHaveBeenCalled();
      expect(voteInit).toHaveBeenCalled();
  });
});
