<?php

namespace Drupal\uswds_ckeditor_integration\Plugin\EmbeddedContent;

use Drupal\ckeditor5_embedded_content\EmbeddedContentInterface;
use Drupal\ckeditor5_embedded_content\EmbeddedContentPluginBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Plugin iframes.
 *
 * @EmbeddedContent(
 *   id = "uswds_summary_box",
 *   label = @Translation("Summary Box"),
 *   description = @Translation("Renders a USWDS Summary Box."),
 * )
 */
class SummaryBox extends EmbeddedContentPluginBase implements EmbeddedContentInterface {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'heading' => NULL,
      'body' => NULL,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#theme' => 'uswds_ckeditor_integration_summary_box',
      '#heading' => $this->configuration['heading'],
      '#body' => $this->configuration['body'],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form['heading'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Heading'),
      '#default_value' => $this->configuration['heading'],
      '#required' => FALSE,
    ];
    $form['body'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Body'),
      '#default_value' => $this->configuration['body'],
      '#required' => TRUE,
    ];
    return $form;
  }

}
