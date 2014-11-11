$(document).on('ready', function() {

  // YOUR CODE HERE:
  window.app = {
    server:'https://api.parse.com/1/classes/chatterbox',
    fetchOptions: {
      limit: 10,
      order: '-createdAt'
    },
    rooms: [],
    chatData: [],
    selectedRoom: null,
  };

  app.templates = {
    message: _.template("<div><%- username %>: <%- text %></div>"),
    room: _.template("<div><%- roomname %></div>"),
    roomOption: _.template("<option data-value=<%- index%> ><%- roomname %></option>")
  };

  app.init = function() {
    this.username = window.location.search.slice(window.location.search.indexOf("=")+1);

    $('form').on('submit', this.submitForm);
    $('#reload-chat').on('click', this.reloadChat);
    $('#roomSelect').on('change', this.selectRoom);

    // should fetch existing messages from the server
    this.fetch(app.fetchHandler);

    console.log("I'm initiated!");
  };

// AJAX REQUESTS
  app.send = function(message) {
    $.ajax({
      type: 'POST',
      url: this.server,
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log("send success!", data);
        $('.message-input').val("");
        app.reloadChat();
      }
    });
  };

  app.fetch = function(successCallback) {
    // default callback
    var successCallback = successCallback || function() {};
    // initiate a new request
    $.ajax({
      type: 'GET',
      url: this.server,
      data: this.fetchOptions,
    // pass the results to a callback
      success: successCallback
    });
  };

// DATA HANDLERS
  app.fetchHandler = function(data) {
    app.chatData = data.results;
    app.renderMessages(data.results);
    app.addRooms().renderRoomSelector()
  };

  app.submitForm = function(event){
    // this bound to input div during callback
    event.preventDefault();

    var newMessage = {
      username: app.username,
      text: $('.message-input').val(),
      roomname: "lobby"
    };

    app.send(newMessage);
    // TODO: read later
    // return false;
  };

  app.reloadChat = function() {
    app.clearMessages();
    app.fetch(app.fetchHandler);
  };

// MESSAGE RENDERING FUNCTIONS
  app.renderMessages = function(chats) {
    // this bound to request object during callback
    var message;
    console.log(chats);

    for (var i = 0; i < chats.length; i++) {
      message = chats[i];
      app.addMessage(message);
    }
  };

  app.addMessage = function(message) {
    if ((typeof message.text === "string") && (typeof message.username === "string")){
      var node = $(app.templates.message(message));
      // append empty message div to #chats
      $('#chats').append(node);
    }
  };

  app.clearMessages = function() {
    $('#chats').html('');
  };


// ROOM FUNCTIONS

  app.addRoom = function(roomname) {
    if (!_.contains(app.room, roomname)){
      app.rooms.push(roomname);
      app.renderRoomSelector();
    }
  };

  app.addRooms = function(){
    var chats = app.chatData;
    app.rooms = [];
    _.each(chats, function(chat){
      if (!_.contains(app.rooms, chat.roomname)) {
        app.rooms.push(chat.roomname);
      }
    });
    return this;
  };

  app.renderRoomSelector = function() {
    $('#roomSelect').html('');
    _.each(app.rooms, function(roomname, index) {
      var option = $(app.templates.roomOption({roomname: roomname, index: index}));
      $('#roomSelect').append(option);
    })
  };

  app.selectRoom = function(event) {

  }

  app.init();
});
