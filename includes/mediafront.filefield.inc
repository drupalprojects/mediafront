<?php

/**
 * Adds or updates a mediafront filefield entry
 */
function mediafront_filefield_save( $entity, $bundle, $field_name, $media_type, $node_preset, $thumb_preset ) {
  $field = mediafront_filefield_get( $entity, $bundle, $field_name );
  $fields = array(
    'entity' => $entity,
    'bundle' => $bundle,
    'field_name' => $field_name,
    'media_type' => $media_type,
    'node_preset' => $node_preset,
    'thumb_preset' => $thumb_preset
  );
  $fid = (isset($field->fid) && $field->fid) ? 'fid' : array();
  if( $fid ) {
    $fields['fid'] = $field->fid;
  }
  return drupal_write_record('mediafront_filefield', $fields, $fid );
}

/**
 * Deletes a mediafront filefield entry
 */
function mediafront_filefield_delete( $entity, $bundle, $field_name ) {
  db_delete('mediafront_filefield')
    ->condition('entity', $entity)
    ->condition('bundle', $bundle)
    ->condition('field_name', $field_name)
    ->execute();
}

/**
 * Returns a mediafront filefield entry.
 */
function mediafront_filefield_get( $entity, $bundle, $field_name ) {
  return db_select('mediafront_filefield', 'f')
    ->fields('f')
    ->condition('f.entity', $entity)
    ->condition('f.bundle', $bundle)
    ->condition('f.field_name', $field_name)
    ->execute()
    ->fetchObject();
}

/**
 * Implementation of hook_form_FORM_ID_alter().
 */
function mediafront_form_field_ui_field_edit_form_alter(&$form, $form_state) {
  if( ($form["#field"]["type"] == "image") || ($form["#field"]["type"] == "file") ) {

    // See if this is an Image field.
    $image = ($form["#field"]["type"] == "image");

    // Create the file field field set.
    $form['mediafront_filefield'] = array(
      "#type" => "fieldset",
      "#weight" => -1,
      "#title" => $image ? t('MediaFront: Image Settings') : t('MediaFront: Media Settings'),
    );

    // Get the file field.
    $field = mediafront_filefield_get(
      $form['instance']['entity_type']['#value'],
      $form['instance']['bundle']['#value'],
      $form['#field']['field_name']
    );

    // Preset a different form if we are an image...
    if( $image ) {
      $form['mediafront_filefield'] = mediafront_preview_field_form(
        $field ? $field->node_preset : 'mediafront_original',
        $field ? $field->thumb_preset : 'mediafront_original'
      );
    }
    else {
      // Preset the media field form.
      $form['mediafront_filefield']['media_type'] = mediafront_media_field_form($field ? $field->media_type : 'media');
    }

    $form['#submit'][] = 'mediafront_filefield_submit';
  }
}

/*
 * Implementation of hook_field_delete_instance().
*/
function mediafront_field_delete_instance($instance) {
  mediafront_filefield_delete( $instance['entity_type'], $instance['bundle'], $instance['field_name'] );
}


/**
 * Called when the user submits the FileField form.
 */
function mediafront_filefield_submit( $form, &$form_state ) {
  // Save this filefield
  mediafront_filefield_save(
    $form_state['values']['instance']['entity_type'],
    $form_state['values']['instance']['bundle'],
    $form_state['values']['instance']['field_name'],
    isset($form_state['values']['media_type']) ? $form_state['values']['media_type'] : '',
    isset($form_state['values']['preview']) ? $form_state['values']['preview'] : '',
    isset($form_state['values']['thumbnail']) ? $form_state['values']['thumbnail'] : ''
  );
}

?>