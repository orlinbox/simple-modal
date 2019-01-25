/*!

MIT License | Copyright (c) 2019 | orlinbox | https://github.com/orlinbox/simple-modal

SM version 1.0

*/

/*
  HTML
*/

(function() {
  // open with mouse
  $('.js-sm-open').click(function() {
    var content = $('.js-sm-content', $(this).parents('.js-sm')).addClass('js-sm-placeholder').contents();
    $(this).addClass('js-sm-opener');
    createsm(content);
  });
  // open with keyboard
  $('.js-sm-open').on('keydown', function(e) {
    if (e.key == 'Enter') {
      var content = $('.js-sm-content', $(this).parents('.js-sm')).addClass('js-sm-placeholder').contents();
      $(this).addClass('js-sm-opener');
      createsm(content);
    }
  });
  // open sm
  function createsm(el) {
    // HTML
    var smHTML = '' +
      '<div class="sm" tabindex="0">' +
        '<div class="sm-wrapper">' +
          '<div class="sm-close" tabindex="0" aria-label="Close modal"></div>' +
          '<div class="sm-inner">' +
            '<div class="sm-content"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '';
    // append
    $('body').append(smHTML);
    $('.sm-content').append(el);
    // show
    $('.sm').hide().fadeIn().focus();
    // close with mouse
    $('.sm-close').click(function() {
      destroysm(this);
    });
    // close with keyboard
    $('.sm-close').on('keydown', function(e) {
      if (e.key == 'Enter') {
        destroysm(this);
      }
    });
  }
  // close sm
  function destroysm(el) {
    var content = $('.sm-content', $(el).parents('.sm')).contents();
    $('.sm').fadeOut(function() {
      $('.js-sm-placeholder').append(content).removeClass('js-sm-placeholder');
      $('.js-sm-opener').removeClass('js-sm-opener').focus();
      $('.sm').remove();
    });
  }
})();
