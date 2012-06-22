<?php

/**
 * Implements hook_field_formatter_info().
 */
function mediafront_field_formatter_info() {
  return array(
    'mediafront_player' => array(
      'label' => t('MediaFront Player'),
      'description' => t('Play this file using a MediaFront Preset.'),
      'field types' => array('file', 'text'),
      'settings' => array(
        'preset' => ''
      )
    )
  );
}

/**
 * Implementation of hook_form_FORM_ID_alter().
 */
function mediafront_form_field_ui_field_edit_form_alter(&$form, $form_state) {

  // Get this field instance.
  $instance = $form['#instance'];

  // Get the options for this field from the field handler.
  $options = !empty($instance['settings']['mediafront']) ? $instance['settings']['mediafront'] : array();

  // Setup the mediafront settings for this field.
  $form['instance']['settings']['mediafront'] = array(
    '#type' => 'fieldset',
    '#title' => 'MediaFront Settings'
  );

  // Add the mediafront field select form.
  $form['instance']['settings']['mediafront'] = array_merge($form['instance']['settings']['mediafront'], mediafront_field_form($options, 'edit-instance-settings-mediafront-'));
}

/**
 * Implements hook_field_formatter_settings_form
 */
function mediafront_field_formatter_settings_form($field, $instance, $view_mode, $form, &$form_state, $type = 'mediafront_player') {
  $display = $instance['display'][$view_mode];
  $settings = $display['settings'];
  $element = array();
  if ($display['type'] == $type) {
    $element['preset'] = mediafront_preset_select_form($settings, 'preset');
  }
  return $element;
}

/**
 * Implements hook_field_formatter_settings_summary
 */
function mediafront_field_formatter_settings_summary($field, $instance, $view_mode, $type = 'mediafront_player') {
  $display = $instance['display'][$view_mode];
  $settings = $display['settings'];
  $summary = '';
  if ($display['type'] == $type) {
    $header = array('Setting', 'Value');
    $items = array();
    foreach ($settings as $name => $value) {
      $items[] = $name . ': ' . $value;
    }
    $summary = theme('item_list', array('title' => t('Player Settings'), 'items' => $items));
  }
  return $summary;
}

/**
 * Implements hook_field_formatter_view().
 */
function mediafront_field_formatter_view($entity_type, $entity, $field, $instance, $langcode, $items, $display, $type = 'mediafront_player') {
  $element = array();
  if ($display['type'] == $type) {

    $player_fields = array();

    // If this is a file, then we need just set the fields to the entity.
    if ($entity_type == 'file') {
      $player_fields = $entity;
    }
    else {
      // Get the fields.
      $media_found = false;
      $entity_fields = field_info_instances($instance['entity_type'], $instance['bundle']);
      foreach ($entity_fields as $name => $entity_field) {
        $options = !empty($entity_field['settings']['mediafront']) ? $entity_field['settings']['mediafront'] : array();
        if (!empty($options['field_type'])) {
          $media_found |= ($options['field_type'] == 'media');
          $player_fields[$entity_field['field_name']] = array(
            'type' => $options['field_type'],
            'field' => $entity_field['field_name'],
            'options' => $options
          );
        }
      }

      // If no media field is set, then just use this field.
      if (!$media_found && !empty($instance['field_name'])) {
        $player_fields[$instance['field_name']] = array(
          'type' => 'media',
          'field' => $instance['field_name'],
          'options' => array(
            'media_type' => 'media'
          )
        );
      }
    }

    $settings = $display['settings'];
    $element[] = array(
      '#theme' => $type,
      '#entity' => $entity,
      '#preset' => $settings['preset'],
      '#fields' => $player_fields,
      '#type' => $display['type']
    );
  }
  return $element;
}

/**
 * Implements hook_file_formatter_info().
 */
function mediafront_file_formatter_info() {

  // Add the mediafront file player.
  $formatters['mediafront_file_player'] = array(
    'label' => t('MediaFront File Player'),
    'file types' => array('video', 'audio'),
    'default settings' => array(
      'preset' => ''
    ),
    'view callback' => 'mediafront_file_formatter_view',
    'settings callback' => 'mediafront_file_formatter_settings',
  );

  return $formatters;
}

/**
 * Implements hook_file_formatter_FORMATTER_settings().
 */
function mediafront_file_formatter_settings($form, &$form_state, $settings) {
  $element = array();
  $element['preset'] = mediafront_preset_select_form($settings, 'preset');
  return $element;
}

/**
 * Implements hook_file_formatter_FORMATTER_view().
 */
function mediafront_file_formatter_view($file, $display, $langcode) {
  $element = array();
  return $element;
}
