define(["backbone",
        "messageView", 
        "inputView", 
        "roomSelectorView", 
        "message",
        "user",
        "room"
        ], 
  function(Backbone, MessageView, InputView, RoomSelectorView, Message, User, Room){
  var App = Backbone.View.extend({
    initialize: function(){
      console.log("it's working!");
      this.bindEvents();
      this.user = new User.Model;
      this.messages = new Message.Collection;
      this.rooms = new Room.Collection (this);
      this.messageView = new MessageView (this);
      this.inputView = new InputView (this);
      this.roomSelectorView = new RoomSelectorView (this);
    },

    bindEvents: function () {
      Backbone.Events.on('reset:messages', (function() {
        this.messageView.render();
        this.rooms.resetRooms();
      }).bind(this));

      Backbone.Events.on('click:fetch-messages', (function() {
        this.messages.getData();
      }).bind(this));

      Backbone.Events.on('reset:rooms', (function() {
        this.roomSelectorView.render();
      }).bind(this));
    }
  });
  return App;
});