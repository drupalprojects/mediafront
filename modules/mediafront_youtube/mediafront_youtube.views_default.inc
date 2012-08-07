<?php
/**
 * @file
 * mediafront_youtube.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function mediafront_youtube_views_default_views() {
  $export = array();

  $view = new view;
  $view->name = 'youtube_media';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'youtube_media';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '15';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all'] = 0;
  $handler->display->display_options['style_plugin'] = 'grid';
  $handler->display->display_options['style_options']['columns'] = '3';
  $handler->display->display_options['style_options']['fill_single_line'] = 1;
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: MediaFront Player */
  $handler->display->display_options['header']['mediafront_player']['id'] = 'mediafront_player';
  $handler->display->display_options['header']['mediafront_player']['table'] = 'views';
  $handler->display->display_options['header']['mediafront_player']['field'] = 'mediafront_player';
  $handler->display->display_options['header']['mediafront_player']['empty'] = FALSE;
  $handler->display->display_options['header']['mediafront_player']['mediafront_preset'] = 'youtube_landing';
  /* Field: Content: Poster */
  $handler->display->display_options['fields']['field_youtube_poster']['id'] = 'field_youtube_poster';
  $handler->display->display_options['fields']['field_youtube_poster']['table'] = 'field_data_field_youtube_poster';
  $handler->display->display_options['fields']['field_youtube_poster']['field'] = 'field_youtube_poster';
  $handler->display->display_options['fields']['field_youtube_poster']['label'] = '';
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_youtube_poster']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_youtube_poster']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_youtube_poster']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_youtube_poster']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_youtube_poster']['settings'] = array(
    'image_style' => 'medium',
    'image_link' => 'content',
  );
  $handler->display->display_options['fields']['field_youtube_poster']['field_api_classes'] = 0;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['title']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['title']['alter']['external'] = 0;
  $handler->display->display_options['fields']['title']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['title']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = 0;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = 0;
  $handler->display->display_options['fields']['title']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['title']['alter']['html'] = 0;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['title']['hide_empty'] = 0;
  $handler->display->display_options['fields']['title']['empty_zero'] = 0;
  $handler->display->display_options['fields']['title']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['title']['link_to_node'] = 1;
  /* Field: Content: YouTube URL */
  $handler->display->display_options['fields']['field_youtube_url']['id'] = 'field_youtube_url';
  $handler->display->display_options['fields']['field_youtube_url']['table'] = 'field_data_field_youtube_url';
  $handler->display->display_options['fields']['field_youtube_url']['field'] = 'field_youtube_url';
  $handler->display->display_options['fields']['field_youtube_url']['label'] = '';
  $handler->display->display_options['fields']['field_youtube_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_youtube_url']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_youtube_url']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_youtube_url']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_youtube_url']['field_api_classes'] = 0;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'youtube_media' => 'youtube_media',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'landing';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page_1');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'mediaplayer';
  $handler->display->display_options['style_options']['mediafront_preset'] = 'youtube_player';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['path'] = 'player';
  $export['youtube_media'] = $view;

  return $export;
}
