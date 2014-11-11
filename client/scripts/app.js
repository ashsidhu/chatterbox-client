$(document).on('ready', function() {

  // YOUR CODE HERE:
  window.app = {
    server:'https://api.parse.com/1/classes/chatterbox'
  };

  app.templates = {
    message: _.template("<div><%- username %>: <%- text %></div>"),
    room: _.template("<div><%- roomname %></div>")
  };

  app.init = function() {
    this.username = window.location.search.slice(window.location.search.indexOf("=")+1);

    $('form').on('submit', this.submitForm);
    $('#reload-chat').on('click', this.reloadChat);

    // should fetch existing messages from the server
    this.fetch(app.renderMessages);

    console.log("I'm initiated!");
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
    $('.message-input').val("");

    // TODO: read later
    // return false;
  };

  app.reloadChat = function() {
    app.clearMessages();
    app.fetch(app.renderMessages);
  };

  app.send = function(message) {
    $.ajax({
      type: 'POST',
      url: this.server,
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log("send success!", data);
      }
    });
  };

  app.fetch = function(successCallback) {
    // default callback
    successCallback = successCallback || function() {};
    // initiate a new request
    $.ajax({
      type: 'GET',
      url: this.server,
    // pass the results to a callback
      success: successCallback
    });
  };


  app.renderMessages = function(data) {
    // this bound to request object during callback
    var message;

    for (var i = 0; i < data.results.length; i++) {
      message = data.results[i];
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
  }

  app.addRoom = function(roomname) {
    var node = $(app.templates.room({roomname: roomname}));
    $('#roomSelect').append(node);
  };

  app.init();
})
