<?php

namespace Drupal\uswds_ckeditor_integration\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * Filter to apply USWDS Sortable attributes.
 *
 * @Filter(
 *   id = "filter_uswds_table_sortable",
 *   title = @Translation("USWDS Sortable Table Attributes CK5"),
 *   description = @Translation("Apply USWD table sortable attributes. With CKEditor5 in mind."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE,
 * )
 */
class FilterUswdsTableSortable extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode): FilterProcessResult {
    $result = new FilterProcessResult($text);

    if (stristr($text, 'table') !== FALSE) {
      $dom = Html::load($text);
      $xpath = new \DOMXPath($dom);
      $tables = $xpath->query('//table[contains(@class, "usa-table--sortable")]');

      // Add USWDS Class to table.
      foreach ($tables as $table) {

        $rows = $xpath->query('.//tr', $table);
        $headers = $xpath->query('//thead//th', $rows->item(0));

        // Add attributes to column headers.
        foreach ($headers as $header) {
          $header->setAttribute('scope', 'col');
          $header->setAttribute('role', 'columnheader');
          $header->setAttribute('data-sortable', TRUE);
        }

        $skip_first = TRUE;
        foreach ($rows as $row) {
          if ($skip_first) {
            $skip_first = FALSE;
            continue;
          }
          $tbodyTags = $xpath->query('//tbody//td|//th', $row);
          foreach ($tbodyTags as $tag) {
            if ($tag->nodeName === 'th') {
              $tag->setAttribute('scope', 'row');
              $tag->setAttribute('role', 'rowheader');
            }
            else {
              $tag->setAttribute('data-sort-value', $tag->nodeValue);
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
