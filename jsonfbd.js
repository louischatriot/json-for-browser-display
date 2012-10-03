/*
 * Bookmarklet that gets the json being displayed and returns a nicely formatted (and indented) JSON
 * Author: Louis Chatriot
 */


var jfbd = jfbd || {};
jfbd.indentLevel = "  ";

jfbd.run = function($) {
  var contents, prop;

  console.log("jQuery and jfbd bookmarklet loaded");

  // Works with Chrome with which I develop, not tested on firefox
  contents = JSON.parse($('pre').html());



console.log(contents);





//var newDoc = document.open("text/html", "replace");
//newDoc.close();
//$('body').html('dsdfsfsf<br>sdssdsdsdfZZZ');

};



// Get underscore and jquery from their CDNs, then launch the bookmarklet
// Code is ugly but it works and is not intended to be modified
(function (app) {
  var underscore = document.createElement('script');
  underscore.src = "http://underscorejs.org/underscore-min.js";

  underscore.onload = function () {
    //Get jQuery if the current page doesn't have it
    if ( typeof jQuery === 'undefined' || jQuery.fn.jquery.substring(0,3) !== '1.7') {

      var fileref = document.createElement('script');
      fileref.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"

      fileref.onload = function() {
        app.run(jQuery);
      }

      document.body.appendChild(fileref);
    } else {
      app.run(jQuery);
    }
  };

  document.body.appendChild(underscore);

}(jfbd));


