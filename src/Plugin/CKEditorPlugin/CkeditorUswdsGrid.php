<?php

namespace Drupal\uswds_ckeditor_integration\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginConfigurableInterface;
use Drupal\ckeditor\CKEditorPluginCssInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\editor\Entity\Editor;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Defines the "uswds_grid" plugin.
 *
 * @CKEditorPlugin(
 *   id = "uswds_grid",
 *   label = @Translation("USWDS Grid")
 * )
 */
class CkeditorUswdsGrid extends CKEditorPluginBase implements CKEditorPluginConfigurableInterface, CKEditorPluginCssInterface, ContainerFactoryPluginInterface {

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected ConfigFactoryInterface $configFactory;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, ConfigFactoryInterface $config_factory) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->configFactory = $config_factory;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('config.factory')
    );
  }

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
    return $this->getModulePath('uswds_ckeditor_integration') . '/js/plugins/uswds_grid/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [
      'core/jquery',
      'core/drupal',
      'core/drupal.ajax',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $path = $this->getModulePath('uswds_ckeditor_integration') . '/js/plugins/uswds_grid';
    return [
      'uswds_grid' => [
        'label' => 'USWDS Grid',
        'image' => $path . '/icons/uswds_grid.png',
      ],
    ];
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
  public function settingsForm(array $form, FormStateInterface $form_state, Editor $editor) {
    $settings = $editor->getSettings();
    $config = $settings['plugins']['uswds_grid'] ?? [];

    $available_columns = array_combine($r = range(1, 12), $r);
    $form['available_columns'] = [
      '#title' => $this->t('Allowed Columns'),
      '#type' => 'checkboxes',
      '#options' => $available_columns,
      '#default_value' => $config['available_columns'] ?? $available_columns,
      '#prefix' => '<div class="container-inline">',
      '#suffix' => '</div>',
    ];

    $uswds_breakpoints = $this->configFactory->get('uswds_ckeditor_integration.settings')->get('breakpoints');
    $breakpoint_options = [];
    foreach ($uswds_breakpoints as $class => $breakpoint) {
      $breakpoint_options[$class] = $breakpoint['label'];
    }

    $form['available_breakpoints'] = [
      '#title' => $this->t('Allowed Breakpoints'),
      '#type' => 'checkboxes',
      '#options' => $breakpoint_options,
      '#default_value' => $config['available_breakpoints'] ?? array_combine($k = array_keys($breakpoint_options), $k),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function getCssFiles(Editor $editor) {
    $settings = $editor->getSettings();
    $config = $settings['plugins']['uswds_grid'] ?? [];
    return !empty($config['use_cdn']) && !empty($config['cdn_url']) ? [$config['cdn_url']] : [];
  }

}
