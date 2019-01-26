/*!

MIT License | Copyright (c) 2019 | orlinbox | https://github.com/orlinbox/simple-modal

SM version 1.0

*/

/*
  <div class="js-simple-modal">
    <span class="js-sm-open" tabindex="0" aria-label="Open modal" data-modal-label="Label for the modal">Open modal</span>
    <div class="js-sm-content">
      Modal content
    </div>
  </div>
*/

(function() {
  // init
  $('.js-sm-content').attr('aria-hidden', true).attr('style', 'display:none');
  // open with mouse
  $('.js-sm-open').click(function() {
    if (!$(this).hasClass('js-sm-opener')) {
      var content = $('.js-sm-content', $(this).parents('.js-simple-modal')).addClass('js-sm-placeholder').contents();
      opensm(content, $(this).addClass('js-sm-opener').attr('data-modal-label'));
    }
  });
  // open with keyboard
  $('.js-sm-open').on('keydown', function(e) {
    if (e.key == 'Enter' && !$(this).hasClass('js-sm-opener')) {
      var content = $('.js-sm-content', $(this).parents('.js-simple-modal')).addClass('js-sm-placeholder').contents();
      opensm(content, $(this).addClass('js-sm-opener').attr('data-modal-label'));
      // focus
      $('.sm').focus();
      // close with keyboard
      $('.sm-close').on('keydown', function(e) {
        if (e.key == 'Enter') {
          // return focus
          $('.js-sm-opener').focus();
          // close
          closesm();
        }
      });
    }
  });
  // open function
  function opensm(el, label) {
    // create HTML
    var smHTML = '' +
      '<div class="sm" tabindex="0" role="region" aria-label="' + label + '">' +
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
    $('.sm').hide().fadeIn();
    // close with mouse
    $('.sm-close').click(function() { closesm(); });
    // close with keyboard
    $('body').on('keydown', function(e) {
      if (e.key == 'Escape') {
        // return focus
        $('.js-sm-opener').focus();
        // close
        closesm();
      }
    });
  }
  // close function
  function closesm() {
    $('.sm').fadeOut(function() {
      $('.js-sm-placeholder').append($('.sm-content').contents()).removeClass('js-sm-placeholder');
      $('.js-sm-opener').removeClass('js-sm-opener');
      $('.sm').remove();
    });
  }
})();
