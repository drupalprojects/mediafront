/** The minplayer namespace. */
var minplayer = minplayer || {};

var timeline_resume_time = 0;
var timeline_timeline_resume_link = null;

/**
* Initalize the plugin.
*/
minplayer.timeline_resume = {
  init: function(player) {

    // Reset the timeline time and resume link.
    timeline_resume_time = 0;
    timeline_timeline_resume_link = null;

    // Bind when a node is loaded.
    player.bind('nodeLoad', function(event, node) {
      timeline_resume_time = 0;
      if (node.nid) {
        timeline_resume_link = Drupal.settings.timeline_resume.url;
        timeline_resume_link += '/node/' + node.nid;

        // Get an existing timeline resume settings.
        var get_url = Drupal.settings.timeline_resume.get;
        get_url += '/node/' + node.nid;
        jQuery.ajax({
          url: get_url,
          dataType: 'json',
          success: function(data) {
            if (data.mediatime) {
              player.get('media', function(media) {
                media.seek(data.mediatime);
              });
            }
          }
        });
      }
      else {
        timeline_resume_link = null;
      }

      player.get('media', function(media) {
        timeline_resume_time = 0;
        media.bind('timeupdate', function(event, data) {
          timeline_resume_time = Math.floor(data.currentTime);
        });
        media.bind('pause', function(event, data) {
          timeline_resume_time = 0;
        });
      });
    });
  }
};

// Every second send an update to the server.
jQuery(function() {
  setTimeout(function updateTime() {
    if (timeline_resume_time && timeline_resume_link) {
      jQuery.ajax({
        url: timeline_resume_link + '/' + timeline_resume_time,
        dataType: 'json',
        success: function(data) {
          setTimeout(updateTime, Drupal.settings.timeline_resume.refresh);
        }
      });
    }
    else {
      setTimeout(updateTime, Drupal.settings.timeline_resume.refresh);
    }
  }, Drupal.settings.timeline_resume.refresh);
});
