define(["backbone",
        "messageView", 
        "inputView", 
        "roomSelectorView", 
        "message",
        "user",
        ], 
  function(Backbone, MessageView, InputView, RoomSelectorView, Message, User){
    var App = Backbone.View.extend({
        initialize: function(){
            console.log("it's working!");
            this.bindEvents();
            this.user = new User.Model;
            this.messages = new Message.Collection;
        },

        bindEvents: function () {
          Backbone.Events.on('reset:messages', (function() {
            this.messageView = new MessageView;
          }).bind(this));
        }
    });
    return App;
});