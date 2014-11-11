define(["backbone"], function(Backbone) {
  var MessageModel = Backbone.Model.extend({

  });
  var MessageCollection = Backbone.Collection.extend({
    model: MessageModel,
    
    url: 'https://api.parse.com/1/classes/chatterbox',
    
    fetchOptions: {
      limit: 10,
      order: '-createdAt'
    },
    
    initialize: function () {
      this.fetch({
        data: this.fetchOptions,
        success: function() {
          Backbone.Events.trigger('reset:messages');
        }
      });
    },

    parse: function (data){
      return data.results;
    }
  });
  return {
    Model: MessageModel,
    Collection: MessageCollection
  };
});