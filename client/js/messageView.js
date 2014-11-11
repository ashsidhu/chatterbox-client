// messageView.js
define(["backbone"], function(Backbone) {
  var MessageView = Backbone.View.extend({
    template: _.template($('#message-template').html()),

    collection: null,

    el: '#messages-container',

    initialize: function (collection) {
      this.collection = collection;
      this.$messages = this.$el.find('#messages-box');      
      this.bindEvents();
    },

    render: function () {
      this.$messages.append(this.template({messages: this.collection.toJSON()}));
    },

    bindEvents: function () {
      this.$el.find('.fetch-messages').on('click', function() {
        Backbone.Events.trigger('click:fetch-messages');
      });
    }
  });

  return MessageView;
});
