// messageView.js
define(["backbone"], function(Backbone) {
  var MessageView = Backbone.View.extend({
    template: _.template($('#message-template').html()),

    initialize: function () {
      this.render();
    }
  });

  return MessageView;
});
