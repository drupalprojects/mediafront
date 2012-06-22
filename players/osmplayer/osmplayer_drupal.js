(function($) {
  $(document).ready(function() {

    // Iterate through each mediafront player settings.
    $.each(Drupal.settings.mediafront, function(id, settings) {

      // Create the osmplayer.
      $("#" + id).osmplayer(settings);
    });
  });
})(jQuery);