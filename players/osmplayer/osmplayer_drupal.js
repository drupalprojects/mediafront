(function($) {
  $(document).ready(function() {

    // Iterate through each mediafront player settings.
    var plugins = {};
    if (Drupal.settings.hasOwnProperty('mediafront')) {
      $.each(Drupal.settings.mediafront, function(id, settings) {
        if (typeof plugins[settings.preset] !== 'object') {
          plugins[settings.preset] = {};
        }
        plugins[settings.preset][settings.id] = $("#" + id).osmplayer(settings);
      });
    }

    // Now setup all the connections.
    if (Drupal.settings.hasOwnProperty('mediafront_connect')) {
      $.each(Drupal.settings.mediafront_connect, function(plugin_id, settings) {
        minplayer.get(plugin_id, settings.type, function(plugin) {
          $.each(settings.connect, function(preset, preset) {
            if (plugins[preset]) {
              $.each(plugins[preset], function(player_id, player) {
                minplayer.get(player_id, "player", function(player) {
                  player.addPlugin(settings.type, plugin);
                });
              });
            }
          });
        });
      });
    }
  });
})(jQuery);