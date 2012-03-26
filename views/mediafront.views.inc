<?php
// $Id:
/**
 * @file mediafront.views.inc
 * Built in plugins for Views output handling.
 *
 */

/**
 * Implementation of hook_views_plugins
 */
function mediafront_views_plugins() {
  $path = drupal_get_path('module', 'mediafront');
  $plugins = array(
    'module' => 'mediafront', // This just tells our themes are elsewhere.
    'style' => array(
      'mediaplayer' => array(
        'title' => t('Media Player'),
        'help' => t('Shows this view as a Media Player, mapping fields to the playlist elements.'),
        'handler' => 'mediafront_plugin_style_player',
        'path' => "$path/views",
        'theme path' => "$path/views",
        'uses fields' => TRUE,
        'uses row plugin' => FALSE,
        'uses options' => TRUE,
        'uses grouping' => FALSE,
        'type' => 'normal',
        'even empty' => TRUE,
      ),
    )
  );
  return $plugins;
}

/**
 * Implementation of hook_views_data()
 */
function mediafront_views_data() {
  $data['views']['mediafront_player'] = array(
    'title' => t('Media Player'),
    'help' => t('Add a media player field to this view.'),
    'field' => array(
      'handler' => 'mediafront_handler_field_player',
      'click sortable' => FALSE,
    ),
  );
  return $data;
}

/**
 * Allow them to say which field they would like to use for certain
 * MediaFront player fields.
 *
 * @param type $form
 * @param type $form_state
 */
function mediafront_form_views_ui_config_item_form_alter(&$form, &$form_state) {

  // Include CTools dependent
  ctools_include('dependent');

  // Get the options for this field from the field handler.
  $options = $form_state['handler']->options['mediafront'];

  // Setup the mediafront settings for this field.
  $form['options']['mediafront'] = array(
    '#type' => 'fieldset',
    '#title' => 'MediaFront Settings',
    '#collapsible' => TRUE,
    '#collapsed' => TRUE
  );

  // Get the field type for this field to map to mediafront.
  $form['options']['mediafront']['field_type'] = array(
    '#type' => 'select',
    '#title' => 'Field Type',
    '#options' => array(0 => 'None', 'title' => 'Title', 'media' => 'Media', 'image' => 'Image'),
    '#default_value' => $options['field_type']
  );

  // Select the media type for the media.
  $form['options']['mediafront']['media_type'] = mediafront_media_field_form($options['media_type']);
  $form['options']['mediafront']['media_type']['#process'] = array('ctools_dependent_process');
  $form['options']['mediafront']['media_type']['#dependency'] = array('edit-options-mediafront-field-type' => array('media'));

  // Add the preview image form.
  $form['options']['mediafront'] = array_merge($form['options']['mediafront'], mediafront_preview_field_form(
    $options['preview'],
    $options['thumbnail']
  ));

  // Add the CTools dependency on the preview and thumbnail selections.
  $form['options']['mediafront']['preview']['#process'] = array('ctools_dependent_process');
  $form['options']['mediafront']['preview']['#dependency'] = array('edit-options-mediafront-field-type' => array('image'));
  $form['options']['mediafront']['thumbnail']['#process'] = array('ctools_dependent_process');
  $form['options']['mediafront']['thumbnail']['#dependency'] = array('edit-options-mediafront-field-type' => array('image'));

  // Prepend our own submit handler.
  array_unshift($form['buttons']['submit']['#submit'], 'mediafront_form_views_ui_config_item_form_submit');
}

/**
 * Submit handler for the views field items.
 *
 * @param type $form
 * @param type $form_state
 */
function mediafront_form_views_ui_config_item_form_submit(&$form, &$form_state) {

  // Store these settings in the field handler options.
  $form_state['handler']->options['mediafront'] = $form_state['values']['options']['mediafront'];
}
