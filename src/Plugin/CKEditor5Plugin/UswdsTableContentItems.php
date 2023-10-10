<?php

declare(strict_types=1);

namespace Drupal\uswds_ckeditor_integration\Plugin\CKEditor5Plugin;

use Drupal\ckeditor5\Plugin\CKEditor5PluginConfigurableInterface;
use Drupal\ckeditor5\Plugin\CKEditor5PluginConfigurableTrait;
use Drupal\ckeditor5\Plugin\CKEditor5PluginDefault;
use Drupal\Core\Form\FormStateInterface;

/**
 * CKEditor 5 USWDS table content items.
 *
 * @internal
 *   Plugin classes are internal.
 */
class UswdsTableContentItems extends CKEditor5PluginDefault implements CKEditor5PluginConfigurableInterface {

  use CKEditor5PluginConfigurableTrait;

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'table_content_items' => FALSE,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {

    $form['table_content_items'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Use USWDS table content items in toolbar.'),
      '#default_value' => $this->configuration['table_content_items'],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateConfigurationForm(array &$form, FormStateInterface $form_state) {
    $form_value = $form_state->getValue('table_content_items');
    $form_state->setValue('table_content_items', (bool) $form_value);
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['table_content_items'] = $form_state->getValue('table_content_items');
  }

}
