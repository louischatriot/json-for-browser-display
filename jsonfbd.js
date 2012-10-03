/*
 * Bookmarklet that gets the json being displayed and returns a nicely formatted (and indented) JSON
 * Its not intended to be modified and I only use it as a dev tool so I didn't bother making the code beautiful or even acceptable
 * Author: Louis Chatriot
 */


var jfbd = jfbd || {};
jfbd.indentLevel = "  ";

jfbd.run = function($) {
  var contents, toDisplay;

  console.log("jQuery and jfbd bookmarklet loaded");

  // Works with Chrome with which I develop, not tested on firefox
  contents = JSON.parse($('pre').html());

  function getIndent(indentLevel) {
    var res = '', i;

    for (i = 0; i < indentLevel; i++) {
      res = res + jfbd.indentLevel;
    }

    return res;
  }


  function getNiceString(jsonObject, indentLevel) {
    var res = '';

    if (jsonObject === null) { return 'null'; }
    if (jsonObject === undefined) { return 'undefined'; }

    _.each(_.keys(jsonObject), function(k) {
      var representation, value = jsonObject[k];

      if (typeof value === "number") {
        representation = '' + value;
      } else if (typeof value === "object") {
        representation = getNiceString(value, indentLevel + 1);
      } else if (typeof value === "string") {
        representation = '"' + value + '"';
      } else {
        representation = '';   // Don't represent it
      }

      res = res + "<div>" + getIndent(indentLevel) + "<strong>" + k + "</strong>" + ": " + representation + "</div>";
    });

    return res;
  }


  // Display the nice JSON format
  toDisplay = '<pre style="font-family: Bitstream Vera Sans Mono, Courier New, monospace;">' + getNiceString(contents, 1) + '</pre>';
  $('body').html(toDisplay);
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


