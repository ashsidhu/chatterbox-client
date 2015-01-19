//the require library is configuring paths
require.config({
  paths: {
    "jquery": ["../bower_components/jquery/jquery.min"],
    "underscore": "../bower_components/underscore/underscore-min",
    "backbone": "../bower_components/backbone/backbone"
  },
  shim: {
    "backbone": {
            //loads dependencies first
      deps: ["jquery", "underscore"],
            //custom export name, this would be lowercase otherwise
      exports: "Backbone"
    }
  }
});

//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
var app = require(['jquery', 'underscore', 'backbone', 'app', '../env/config'], function(jquery, _, Backbone, App){
  console.log('init');
  return app = new App;
});