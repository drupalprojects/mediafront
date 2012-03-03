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
        'preset' => '',
        'preview' => ''
      )
    )
  );
}

/**
 * Implements hook_field_formatter_settings_form
 */
function mediafront_field_formatter_settings_form($field, $instance, $view_mode, $form, &$form_state) {
  $display = $instance['display'][$view_mode];
  $settings = $display['settings'];
  $element = array();
  if ($display['type'] == 'mediafront_player') {

    // Get the presets.
    $presets = array();
    foreach (mediafront_preset_get_presets() as $preset) {
      $presets[$preset['name']] = $preset['name'];
    }

    // The preset to use for this media player.
    $element['preset'] = array(
      '#title' => t('Preset'),
      '#type' => 'select',
      '#options' => $presets,
      '#default_value' => $settings['preset']
    );

    $options = array();
    $fields = field_info_instances($instance['entity_type'], $instance['bundle']);
    foreach ($fields as $name => $field) {
      $options[$name] = $field['label'];
    }

    // Set the image preview field for this player.
    $element['preview'] = array(
      '#title' => t('Preview Image Field'),
      '#type' => 'select',
      '#options' => $options,
      '#default_value' => $settings['preview']
    );
  }
  return $element;
}

/**
 * Implements hook_field_formatter_settings_summary
 */
function mediafront_field_formatter_settings_summary($field, $instance, $view_mode) {
  $display = $instance['display'][$view_mode];
  $settings = $display['settings'];
  $summary = '';
  if ($display['type'] == 'mediafront_player') {
    $header = array('Setting', 'Value');
    $rows = array();
    foreach ($settings as $name => $value) {
      $rows[] = array($name, $value);
    }
    $summary = theme('table', array('header' => $header, 'rows' => $rows));
  }
  return $summary;
}

/**
 * Implements hook_field_formatter_view().
 */
function mediafront_field_formatter_view($entity_type, $entity, $field, $instance, $langcode, $items, $display) {
  $element = array();
  if ($display['type'] == 'mediafront_player') {
    $settings = $display['settings'];
    $element[] = array(
      '#theme' => 'mediafront_player_formatter',
      '#entity' => $entity,
      '#preset' => $settings['preset'],
      '#preview' => $settings['preview'],
      '#media' => $instance['field_name']
    );
  }
  return $element;
}

/**
 * Theme for the Media Player field.
 */
function theme_mediafront_player_formatter($variables) {
  $variables = array_shift($variables);
  $preset = $variables['#preset'];
  $entity = $variables['#entity'];
  $media = $variables['#media'];
  $preview = $variables['#preview'];
  return theme('mediafront_player', array(
    'entity' => $entity,
    'preset' => $preset,
    'media' => mediafront_get_media($entity, $media, $preview)
  ));
}
?>