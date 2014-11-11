define(["backbone"], function(Backbone) {
  var RoomModel = Backbone.Model.extend({
    defaults: {
      name: null
    }
  });
  var RoomCollection = Backbone.Collection.extend({
    model: RoomModel,

    messages: null,

    selectedRoom: null,

    initialize: function (app) {
      this.messages = app.messages;
    },

    addRoom: function () {

    },

    getRoomsFromMessages: function () {
      return _.map(_.uniq(this.messages.toJSON().map(function (message) {
        return message.roomname
      })), function(roomname) {
        return {
          name: roomname
        }      
      });
    },

    resetRooms: function () {
      this.reset(this.getRoomsFromMessages());
      Backbone.Events.trigger('reset:rooms');
    },

    getSelectedRoom: function () {
      return this.selectedRoom;
    }

  });

  return {
    Model: RoomModel,
    Collection: RoomCollection
  };
});