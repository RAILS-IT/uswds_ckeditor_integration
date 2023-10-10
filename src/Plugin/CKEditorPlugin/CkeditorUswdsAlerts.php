<?php

namespace Drupal\uswds_ckeditor_integration\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "CKEditorUswdsAlerts" plugin.
 *
 * @CKEditorPlugin (
 *   id = "uswds_alerts",
 *   label = @Translation("CKEditorUswdsAlerts"),
 *   module = "uswds_ckeditor_integration"
 * )
 */
class CkeditorUswdsAlerts extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return $this->getModulePath('uswds_ckeditor_integration') . '/js/plugins/uswds_alerts/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $path = $this->getModulePath('uswds_ckeditor_integration') . '/js/plugins/uswds_alerts/icons';
    return [
      'Alerts' => [
        'label' => 'Add Alert',
        'image' => $path . '/alerts.png',
      ],
    ];
  }

}
