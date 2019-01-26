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
      $('.js-smsm').focus();
      // close with keyboard
      $('.js-smsm-close').on('keydown', function(e) {
        if (e.key == 'Enter') {
          // return focus
          $('.js-sm-opener').focus();
          // close
          closesm();
        }
      });
    }
  });
  // custom vh for mobile devices (due to address bar height)
  function customvh() { document.documentElement.style.setProperty('--smvh', window.innerHeight*0.01 + 'px'); }
  // orientation change
  if ($('.js-simple-modal').length) {
    window.addEventListener('orientationchange', function() {
      customvh();
      var afterOrientationChange = function() {
        customvh();
        window.removeEventListener('resize', afterOrientationChange);
      };
      window.addEventListener('resize', afterOrientationChange);
    });
  }
  // open function
  function opensm(el, label) {
    customvh();
    // create HTML
    var smHTML = '' +
      '<div class="js-smsm" tabindex="0" role="region" aria-label="' + label + '">' +
        '<div class="js-smsm-wrapper">' +
          '<div class="js-smsm-close" tabindex="0" aria-label="Close modal"></div>' +
          '<div class="js-smsm-inner">' +
            '<div class="js-smsm-content"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '';
    // append
    $('body').append(smHTML);
    $('.js-smsm-content').append(el);
    // show
    $('.js-smsm').hide().fadeIn();
    // close with mouse
    $('.js-smsm-close').click(function() { closesm(); });
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
    $('.js-smsm').fadeOut(function() {
      $('.js-sm-placeholder').append($('.js-smsm-content').contents()).removeClass('js-sm-placeholder');
      $('.js-sm-opener').removeClass('js-sm-opener');
      $('.js-smsm').remove();
    });
  }
})();
