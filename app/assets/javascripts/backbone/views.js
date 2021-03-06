(function(){
  'use strict';

  barberPoll.Views.PieChartView = Backbone.View.extend({
    initialize: function(){
      this.$el.html(this.template());
    },
    template: JST['pie_chart'],
    data: function(){
      return this.model.answers().dataForPieChart();
    },
    chart: function(){
      var self = this;
      nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .labelType("percent")
            .showLegend(true)
            .showLabels(true);

          d3.select("#chart svg")
            .datum(self.data())
            .transition().duration(0)
            .call(chart);

        return chart;
      });

    },
    render: function(){
      this.chart();
      return this;
    }
  });

  barberPoll.Views.ResultContainerView = Backbone.View.extend({
    template: JST['result'],
    initialize: function(opts){
      window.resultContainer = this;
      this.model = new barberPoll.Models.Survey({id: parseInt(opts.id)});

      this.model.socketListener();

      this.listenTo(this.model.answers(), 'add', this.render);
      this.fetch()
    },
    render: function(){
      var pie = new barberPoll.Views.PieChartView({model: this.model});

      this.$el.html(this.template(this.presenter()));
      this.model.answers().forEach(this.renderAnswer, this);

      this.$el.find('#pie').append(pie.render().$el);
      return this;
    },
    renderAnswer: function(model) {
      var view = new barberPoll.Views.ResultAnswerView({model: model});
      this.$el.find('.result_answers').append(view.render());
    },
    presenter: function(){
      var formatted = {
        totalVotes: this.model.answers().totalVotes()
      }
      return _.extend({}, this.model.attributes,formatted);
    },
    fetch: function(){
      var self = this;
      this.model.fetch({
        success: function(model,response) {
          self.model.answers().reset()
          self.model.answers().add(response.answers);
        }
      });
    }
  });

  barberPoll.Views.ResultAnswerView = Backbone.View.extend({
    template: JST['result_answer'],
    tagName: "li",
    initialize: function(){
      this.listenTo(this.model, 'change:percentage', this.render);
    },
    render: function(){
      return this.$el.html(this.template(this.presenter()));
    },
    presenter: function(){
      var formatted = {
        percentage: this.formattedPercentage()
      }
      return _.extend({}, this.model.attributes,formatted);
    },
    formattedPercentage: function() {
      return Math.round(this.model.get('percentage') * 100) + "%";
    }
  });

  barberPoll.Views.VoteContainerView = Backbone.View.extend({
    template: JST['vote'],
    initialize: function(opts) {
      this.$flash = $('.flash');
      this.model = new barberPoll.Models.Survey({id: parseInt(opts.id)});
      this.fetch();
    },
    events: {
      "click a.submit": "save"
    },
    save: function(e){
      e.preventDefault();
      var self = this;
      this.model.save(this.model.attributes, {
        success: function(model){
          barberPoll.router.navigate(model.id.toString() + "/r", {trigger: true});
        },
        error: function(model,response,options){
          self.renderErrors(response.responseJSON);
        }
      });
    },
    fetch: function() {
      var self = this;
      this.model.fetch({
        success: function(model,response) {
          self.model.answers().add(response.answers);
          self.render();
        }
      });
    },
    render: function(){
      var self = this;
      this.$el.html(this.template(this.model.attributes));
      this.model.answers().forEach(this.renderAnswer, this);
      return this;
    },
    renderErrors: function(errors) {
      this.$flash.html(_.map(errors, function(error) {
        return "<p>" + error + "</p>"
      }));
      setTimeout(_.bind(function() { this.$flash.html(''); }, this), 2000);
    },
    renderAnswer: function(model) {
      var answerView = new barberPoll.Views.VoteAnswerView({
        model: model,
        collection: this.model.answers()
      });
      this.$el.find('.vote_answers').append(answerView.render());
    }
  });

  barberPoll.Views.VoteAnswerView = Backbone.View.extend({
    template: JST['vote_answer_text'],
    tagName: "li",
    initialize: function(){
      this.listenTo(this.model, 'change', this.updateCheckboxEl);
    },
    updateCheckboxEl: function(){
      this.$el.find('input').prop('checked', this.model.get('selected'));
    },
    events: {
      "change input": "setSelection"
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
      "click a.submit": "save",
      'click #permissiveVoting': 'setPermissiveVoting'
    },
    initialize: function() {
      _.bindAll(this, 'renderAnswer');
      this.$flash = $('.flash');
      this.model = new barberPoll.Models.Survey();
      this.listenTo(this.model.answers(), "add", this.renderAnswer);
    },
    setText: function(e) {
      this.model.set('question', $(e.target).val());
    },
    setPermissiveVoting: function(e){
      var $input = $(e.target);
      this.model.set({permissive_voting: $input.is(':checked')});
    },
    save: function(e) {
      e.preventDefault();
      var self = this;
      this.model.save(null, {
        success: function(model){
          barberPoll.router.navigate(model.id.toString(), {trigger: true});
        },
        error: function(model,response,options){
          self.renderErrors(response.responseJSON);
        }
      })
    },
    renderErrors: function(errors) {
      this.$flash.html(_.map(errors, function(error) {
        return "<p>" + error + "</p>"
      }));
      setTimeout(_.bind(function() { this.$flash.html(''); }, this), 2000);
    },
    renderAnswer: function(model) {
      var view = new barberPoll.Views.AnswerView({model: model});
      this.$('#answers').append(view.render().$el);
      view.setFocus();
    },
    render: function(e){
      this.$el.html(this.template(this.model.toJSON()));
      this.$('textarea').autosize();
      this.bootstrapInitialAnswers(3);
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
      'blur textarea': 'setText',
      'keydown textarea': 'addNextAnswer'
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
      this.$('textarea').autosize();
      return this;
    }
  });
})();
