// messageView.js
define(["backbone"], function(Backbone) {
  var MessageView = Backbone.View.extend({
    template: _.template($('#message-template').html()),

    collection: null,

    // el: '#messages-container',

    initialize: function (app) {
      this.collection = app.messages;
      this.$el = $('#messages-container');

      this.$messages = $('#messages-box');
      this.$fetchButton = $('.fetch-messages');    
      this.bindEvents();
    },

    render: function () {
      this.$messages.html('').append(this.template({messages: this.collection.toJSON()}));
    },

    bindEvents: function () {
      this.$fetchButton.on('click', function() {
        Backbone.Events.trigger('click:fetch-messages');
      });
    }
  });

  return MessageView;
});
