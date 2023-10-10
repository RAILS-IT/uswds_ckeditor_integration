<?php

namespace Drupal\uswds_ckeditor_integration\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * Filter to apply USWDS Stacked attributes.
 *
 * @Filter(
 *   id = "filter_table_attributes",
 *   title = @Translation("USWDS Stacked Table Attributes CK5"),
 *   description = @Translation("Apply USWD table stacked attributes. With CKEditor5 in mind."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE,
 * )
 */
class FilterTableAttributes extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode): FilterProcessResult {
    $result = new FilterProcessResult($text);

    if (stristr($text, 'table') !== FALSE) {
      $dom = Html::load($text);
      $xpath = new \DOMXPath($dom);
      $tables = $xpath->query('//table[contains(@class, "usa-table--stacked")]');

      // Add USWDS Class to table.
      foreach ($tables as $table) {

        $rows = $xpath->query('.//tr', $table);
        $headers = $xpath->query('//thead//th', $rows->item(0));

        $table_headers = [];
        // Add attributes to column headers.
        foreach ($headers as $header) {
          $header->setAttribute('scope', 'col');
          $label = $header->nodeValue;
          $table_headers[] = $label;
        }

        // Add scope to row.
        $skip_first = TRUE;
        foreach ($rows as $row) {
          if ($skip_first) {
            $skip_first = FALSE;
            continue;
          }
          $counter = 0;
          foreach ($row->childNodes as $tag) {
            switch ($tag->nodeName) {
              case 'th':
                $tag->setAttribute('scope', 'row');
                break;

              case 'td':
                $data_label = $table_headers[$counter];
                $tag->setAttribute('data-label', $data_label);
                $counter++;
                break;

              default:
                break;
            }
          }
        }
      }

      $result->setProcessedText(Html::serialize($dom));
    }
    return $result;
  }

  /**
   * {@inheritdoc}
   */
  public function tips($long = FALSE) {
    return $this->t('Filter to convert usa-table-stacked into responsive markup.');
  }

}
