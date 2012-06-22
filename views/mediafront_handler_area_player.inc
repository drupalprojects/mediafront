<?php

/**
 * @file
 * Contains views_handler_area_text handler.
 */

/**
 * Views mediafront player area handler.
 * @ingroup views_area_handlers Views' area handlers
*/
class mediafront_handler_area_player extends views_handler_area {

  function option_definition() {
    $options = parent::option_definition();
    $options['mediafront_preset'] = array('default' => '');
    return $options;
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['mediafront_preset'] = mediafront_preset_select_form($this->options);
  }

  function render($empty = FALSE) {
    static $instance = 0;
    $instance++;

    // Mediafront ID.
    $id = 'mediafront_' . $this->view->name . '_' . $instance;

    // Determine if any field wishes to link to the media player.
    foreach ($this->view->field as $name => $field) {
      if (!empty($field->options['mediafront']['link_to_player'])) {
        drupal_add_js('
          (function($) {
            $(document).ready(function() {
              $(".views-field-' . drupal_clean_css_identifier($name) . '").each(function(index, element) {
                $(element).click(function(event) {
                  event.preventDefault();
                  minplayer.get("' . $id . '", "player", function(player) {
                    player.loadNode(Drupal.settings.mediafront["' . $id . '"].playlist.nodes[index]);
                  });
                });
              });
            });
          })(jQuery);
        ', 'inline');
      }
    }

    // Return the media player.
    return mediafront_get_player($this->options['mediafront_preset'], array(
      'id' => $id,
      'disablePlaylist' => true,
      'playlist' => mediafront_get_playlist_from_view($this->view)
    ));
  }
}
