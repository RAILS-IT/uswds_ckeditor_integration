<?php

declare(strict_types=1);

namespace Drupal\uswds_ckeditor_integration\Plugin\CKEditor5Plugin;

use Drupal\ckeditor5\Plugin\CKEditor5PluginConfigurableInterface;
use Drupal\ckeditor5\Plugin\CKEditor5PluginConfigurableTrait;
use Drupal\ckeditor5\Plugin\CKEditor5PluginDefault;
use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\EditorInterface;

/**
 * CKEditor 5 USWDS class overrides.
 *
 * @internal
 *   Plugin classes are internal.
 */
class UswdsAccordion extends CKEditor5PluginDefault implements CKEditor5PluginConfigurableInterface {

  use CKEditor5PluginConfigurableTrait;

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'bordered' => FALSE,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {

    $form['bordered'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Default with border.'),
      '#default_value' => $this->configuration['bordered'],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateConfigurationForm(array &$form, FormStateInterface $form_state) {
    $form_value = $form_state->getValue('bordered');
    $form_state->setValue('bordered', (bool) $form_value);
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['bordered'] = $form_state->getValue('bordered');
  }

  /**
   * {@inheritdoc}
   */
  public function getDynamicPluginConfig(array $static_plugin_config, EditorInterface $editor): array {
    $static_plugin_config[] = array_merge(
      $static_plugin_config,
      $this->getConfiguration()
    );

    return [
      'uswds_accordion' => [
        'options' => $static_plugin_config,
      ],
    ];
  }

}
