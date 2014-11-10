// YOUR CODE HERE:
var app = {
  server:'https://api.parse.com/1/classes/chatterbox'
};

app.init = function() {
  console.log("I'm initiated!");
  // should fetch existing messages from the server
  // should display all of the fetched messages
};


app.send = function(message) {
  $.ajax({
    type: 'POST',
    url: app.server,
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log("send success!", data);
    }
  });
};

app.fetch = function() {
  // initiate a new request
  $.ajax({
    type: 'GET',
    url: app.server,
  // pass the results to a callback
    success: function(data) {
      console.log("success!!", data);
    }
  });
};

app.init();
