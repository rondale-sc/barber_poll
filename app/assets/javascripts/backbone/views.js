(function(){
  'use strict';

  barberPoll.Views.ResultContainerView = Backbone.View.extend({
    template: JST['result'],
    initialize: function(opts){
      this.model = new barberPoll.Models.Survey({id: parseInt(opts.id)});
      this.fetch()
    },
    render: function(){
      this.$el.html(this.template(this.model.attributes));
      this.model.answers().forEach(this.renderAnswer, this);
    },
    renderAnswer: function(model) {
      var view = new barberPoll.Views.ResultAnswerView({model: model});
      this.$el.find('#answers').append(view.render());
    },
    fetch: function(){
      var self = this;
      this.model.fetch({
        success: function(model,response) {
          $.each(response.answers, function(index, item) {
            self.model.answers().add(item);
          });
          self.render();
        }
      });
    }
  });

  barberPoll.Views.ResultAnswerView = Backbone.View.extend({
    template: JST['result_answer'],
    render: function(){
      return this.$el.html(this.template(this.model.attributes));
    }
  });

  barberPoll.Views.VoteContainerView = Backbone.View.extend({
    template: JST['vote'],
    initialize: function(opts) {
      this.model = new barberPoll.Models.Survey({id: parseInt(opts.id)});
      this.fetch();
    },
    events: {
      "click a.submit": "save"
    },
    save: function(e){
      e.preventDefault();
      this.model.save(this.model.attributes, {
        success: function(model){
          barberPoll.router.navigate(model.id.toString() + "/r", {trigger: true});
        }
      });
    },
    fetch: function() {
      var self = this;
      this.model.fetch({
        success: function(model,response) {
          $.each(response.answers, function(index, item) {
            self.model.answers().add(item);
          });
          self.render();
        }
      });
    },
    render: function(){
      this.$el.html(this.template(this.model.attributes));
      this.model.answers().forEach(this.renderAnswer, this);
      return this;
    },
    renderAnswer: function(model) {
      var answerView = new barberPoll.Views.VoteAnswerView({
        model: model,
        collection: this.model.answers()
      });
      this.$el.find('#answers').append(answerView.render());
    }
  });

  barberPoll.Views.VoteAnswerView = Backbone.View.extend({
    template: JST['vote_answer_text'],
    initialize: function(){
      this.listenTo(this.model, 'change', this.updateCheckboxEl);
    },
    updateCheckboxEl: function(){
      this.$el.find('input').prop('checked', this.model.get('selected'));
    },
    events: {
      "click input": "setSelection"
    },
    render: function(){
      return this.$el.html(this.template(this.model.attributes));
    },
    setSelection: function(){
      this.collection.clearSelected(this.model);
      this.model.set('selected',true);
    }
  });

  barberPoll.Views.SurveyContainerView = Backbone.View.extend({
    template: JST['new'],
    events: {
      "blur #survey_question": "setText",
      "click a.submit": "save"
    },
    initialize: function() {
      _.bindAll(this, 'renderAnswer');
      this.model = new barberPoll.Models.Survey();
      this.listenTo(this.model.answers(), "add", this.renderAnswer);
    },
    setText: function(e) {
      this.model.set('question', $(e.target).val());
    },
    save: function(e) {
      e.preventDefault();
      this.model.save(null, {
        success: function(model){
          barberPoll.router.navigate(model.id.toString(), {trigger: true});
        }
      })
    },
    renderAnswer: function(model) {
      var view = new barberPoll.Views.AnswerView({model: model});
      this.$('#answers').append(view.render().$el);
      view.setFocus();
    },
    render: function(e){
      this.$el.html(this.template(this.model.toJSON()));
      this.bootstrapInitialAnswers(4);
      return this;
    },
    bootstrapInitialAnswers: function(count){
      for(var i = 0; i < count; i++) {
        this.model.answers().add({});
      }
    }
  });

  barberPoll.Views.AnswerView = Backbone.View.extend({
    template: JST['answer_field'],
    events: {
      'blur input': 'setText',
      'keydown input': 'addNextAnswer'
    },
    addNextAnswer: function(e) {
      if(this.model.collection.last() == this.model) {
        this.model.collection.add({});
      }
    },
    setText: function(e) {
      e.preventDefault();
      this.model.set({answer_text: $(e.target).val()});
    },
    setFocus: function() {
      this.$el.focus();
    },
    render: function(){
      this.$el.html(
        this.template({index: this.model.collection.length})
      );
      return this;
    }
  });
})();
