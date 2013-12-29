// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require vanilla-ujs
//= require_tree .


rails.domReady(function() {
  var $ = document.querySelector.bind(document);
  var $$ = document.querySelectorAll.bind(document);

  rails.addListener($('#data-remote1'), 'ajax:success', function(e) {
    console.log('ajax:success', e.xhr);
  });

  rails.addListener($('#data-remote1'), 'ajax:error', function(e) {
    console.log('ajax:error', e.xhr);
  });

  rails.addListener($('#data-remote1'), 'ajax:complete', function(e) {
    console.log('ajax:complete', e.xhr);
  });

  rails.addListener($('#data-remote2'), 'ajax:complete', function(e) {
    console.log('ajax:complete for #data-remote2', e.xhr);
  });
});