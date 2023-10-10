<?php

// phpcs:ignoreFile Drupal.NamingConventions.ValidFunctionName.ScopeNotCamelCaps

declare(strict_types=1);

namespace Drupal\uswds_ckeditor_integration\Plugin\CKEditor4To5Upgrade;

use Drupal\ckeditor5\HTMLRestrictions;
use Drupal\ckeditor5\Plugin\CKEditor4To5UpgradePluginInterface;
use Drupal\Core\Plugin\PluginBase;
use Drupal\filter\FilterFormatInterface;

/**
 * Provides the CKEditor 4 to 5 upgrade for CKEditor plugins.
 *
 * @CKEditor4To5Upgrade(
 *   id = "uswds_ckeditor_integration",
 *   cke4_buttons = {
 *     "uswds_accordion",
 *   },
 *   cke4_plugin_settings = {
 *   },
 *   cke5_plugin_elements_subset_configuration = {
 *   }
 * )
 *
 * @internal
 *   Plugin classes are internal.
 */
class UswdsButtons extends PluginBase implements CKEditor4To5UpgradePluginInterface {

  /**
   * {@inheritdoc}
   */
  public function mapCKEditor4ToolbarButtonToCKEditor5ToolbarItem(string $cke4_button, HTMLRestrictions $text_format_html_restrictions): ?array {
    switch ($cke4_button) {
      case 'uswds_alerts':
      case 'uswds_overrides':
      case 'uswds_table':
        return NULL;

      case 'uswds_accordion':
        return ['UswdsAccordion'];

      case 'uswds_grid':
        return ['UswdsGrid'];

      default:
        throw new \OutOfBoundsException();
    }
  }

  /**
   * {@inheritdoc}
   */
  public function mapCKEditor4SettingsToCKEditor5Configuration(string $cke4_plugin_id, array $cke4_plugin_settings): ?array {
    throw new \OutOfBoundsException();
  }

  /**
   * {@inheritdoc}
   */
  public function computeCKEditor5PluginSubsetConfiguration(string $cke5_plugin_id, FilterFormatInterface $text_format): ?array {
    throw new \OutOfBoundsException();
  }

}
