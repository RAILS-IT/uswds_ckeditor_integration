<?php

namespace Drupal\uswds_ckeditor_integration\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginConfigurableInterface;
use Drupal\ckeditor\CKEditorPluginContextualInterface;
use Drupal\ckeditor\CKEditorPluginInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "uswds_overrides" plugin.
 *
 * @CKEditorPlugin(
 *   id = "uswds_overrides",
 *   label = @Translation("Ckeditor USWDS Overrides"),
 *   module = "uswds_ckeditor_integration"
 * )
 */
class CkeditorUswdsOverrides extends CKEditorPluginBase implements CKEditorPluginInterface, CKEditorPluginContextualInterface, CKEditorPluginConfigurableInterface {

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return $this->getModulePath('uswds_ckeditor_integration') . '/js/plugins/uswds_overrides/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function isEnabled(Editor $editor) {
    // Automatically enable this plugin if Table button is enabled.
    $settings = $editor->getSettings();

    $checked = $settings['plugins']['uswds_overrides']['overrides_lists'] ?? FALSE;

    if (!empty($settings) && $checked) {
      return TRUE;
    }

    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state, Editor $editor) {

    $settings = $editor->getSettings();

    $form['overrides_lists'] = [
      '#title' => 'Override markup with USWDS classes.',
      '#type' => 'checkbox',
      '#default_value' => $settings['plugins']['uswds_overrides']['overrides_lists'] ?? '',
      '#description' => $this->t('Check to override list tags with USWDS clases.'),
    ];

    return $form;
  }

}
