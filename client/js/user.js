define(["backbone"], function(Backbone) {
  var User = Backbone.Model.extend({
    defaults: {
      name: null,
      messages: null
    },
    initialize: function() {
      // this.set('name', prompt());
      this.set('name', 'Ash');
      Backbone.Events.on('reset:messages', function() {
        console.log('i am user and i got messages');
      })
    }
  });
  return {
    Model: User
  };
});