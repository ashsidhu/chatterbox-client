define(["backbone"], function(Backbone) {
  var MessageModel = Backbone.Model.extend({
    defaults: {
      createdAt: null,
      objectId: null,
      roomname: null,
      text: null,
      updatedAt: null,
      username: null
    }
  });
  var MessageCollection = Backbone.Collection.extend({
    model: MessageModel,
    
    url: 'https://api.parse.com/1/classes/chatterbox',
    
    fetchOptions: {
      limit: 10,
      order: '-createdAt'
    },
    
    initialize: function () {
      this.getData();
    },

    getData: function (options) {
      options = _.extend(this.fetchOptions, options);
      this.fetch({
        data: options,
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