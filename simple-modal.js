/*!

MIT License | Copyright (c) 2019 | orlinbox | https://github.com/orlinbox/simple-modal

SM version 1.0

*/

/*
  HTML
*/

(function() {
  // open with mouse
  $('.js-lightbox-open').click(function() {
    var content = $('.js-lightbox-content', $(this).parents('.js-lightbox')).addClass('js-lightbox-placeholder').contents();
    $(this).addClass('js-lightbox-opener');
    createLightbox(content);
  });
  // open with keyboard
  $('.js-lightbox-open').on('keydown', function(e) {
    if (e.key == 'Enter') {
      var content = $('.js-lightbox-content', $(this).parents('.js-lightbox')).addClass('js-lightbox-placeholder').contents();
      $(this).addClass('js-lightbox-opener');
      createLightbox(content);
    }
  });
  // open lightbox
  function createLightbox(el) {
    // HTML
    var lightboxHTML = '' +
      '<div class="lightbox" tabindex="0">' +
        '<div class="lightbox-wrapper">' +
          '<div class="lightbox-close" tabindex="0" aria-label="Close modal"></div>' +
          '<div class="lightbox-inner">' +
            '<div class="lightbox-content"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '';
    // append
    $('body').append(lightboxHTML);
    $('.lightbox-content').append(el);
    // show
    $('.lightbox').hide().fadeIn().focus();
    // close with mouse
    $('.lightbox-close').click(function() {
      destroyLightbox(this);
    });
    // close with keyboard
    $('.lightbox-close').on('keydown', function(e) {
      if (e.key == 'Enter') {
        destroyLightbox(this);
      }
    });
  }
  // close lightbox
  function destroyLightbox(el) {
    var content = $('.lightbox-content', $(el).parents('.lightbox')).contents();
    $('.lightbox').fadeOut(function() {
      $('.js-lightbox-placeholder').append(content).removeClass('js-lightbox-placeholder');
      $('.js-lightbox-opener').removeClass('js-lightbox-opener').focus();
      $('.lightbox').remove();
    });
  }
})();
