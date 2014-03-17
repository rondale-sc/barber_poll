//= require 'spec_helper'

describe("barberPoll.Views.SurveyContainerView", function(){
  var survey_container_view;
  beforeEach(function(){
    survey_container_view = new barberPoll.Views.SurveyContainerView();
  });

  describe("save", function(){
    xit("delegates to its model", function(){
      var model = jasmine.createSpyObj('model', ['save']);
      var event = jasmine.createSpyObj('event', ['preventDefault']);

      spyOn(survey_container_view, 'model').andReturn("blah")

      survey_container_view.save(event);
      expect(model).toHaveBeenCalledWith('save');
    });
  });
});
