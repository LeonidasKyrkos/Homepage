'use strict';


var $ = require('jquery');
var jQuery = $;


var Snowfield = require('./weather');
var container = document.getElementById('canvas');
var weather = new Snowfield(container);




// xwindow //

(function(){

  var xlink = $('.xLink');

  xlink.on('click',newWindow);

  function newWindow(e) {
  	e.preventDefault();
    var target = $(this).attr('href');

    window.open(target);
  }

})();