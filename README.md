## CONTENTS OF THIS FILE

 * Introduction
 * Features
 * Requirements
 * Installation
 * Configuration
 * Maintainers

## INTRODUCTION

With the USWDS library (https://designsystem.digital.gov/) becoming
a requirement for government websites thought it would be useful to
have some integration with the ckeditor. The primary goal is to make
it easy for a user to utilize and inject USWDS classes and
components directly into the ckeditor without opening up the source.

**NOTE:CKEditor4 is EOL end of 2023 so the plugins for those will be
less supported to better prepare for CKEditor5**

This module will provide 2 Example USWDS text profiles
1. USWDS Ck5
2. USWDS

For a full description of this module,
visit the project page: See https://www.drupal.org/project/uswds_ckeditor_integration

To submit bug reports and feature suggestions, or track changes:
See https://www.drupal.org/project/issues/uswds_ckeditor_integration

## Shout outs!
* Maintainers of [Ckeditor BS Grid](https://www.drupal.org/project/ckeditor_bs_grid)
  * Forked this bootstrap module for USWDS.
* Maintainers of [Ckeditor5 Embedded Content](https://www.drupal.org/project/ckeditor5_embedded_content)
  * Added a few components and transitioned a few to this module.
* Maintainers of [Ckeditor Accordion](https://www.drupal.org/project/ckeditor_accordion)
  * Forked this for USWDS.

## FEATURES

### CKEditor5 Integration (2.x branch)
1. Introducing [CKEditor5 Embedded Content](https://www.drupal.org/project/ckeditor5_embedded_content)
   * [Accordion](https://designsystem.digital.gov/components/accordion/)
   * [Alerts]( https://designsystem.digital.gov/components/alert/)
   * [Process List](https://designsystem.digital.gov/components/process-list/)
   * [Summary Box](https://designsystem.digital.gov/components/summary-box/)
2. USWDS Overrides
   * Default class for links, lists, and tables
3. USWDS Table Attributes See https://designsystem.digital.gov/components/table/
   * Add abiity to make tables borderless, scrollable,
     stackable/responsive, and sortable with USWDS classes.

### CKEditor4 (1.x branch)
These are the old plugins
1. Using [CKEditor Templates](https://www.drupal.org/project/ckeditor_templates)
   * [Summary Box](https://designsystem.digital.gov/components/summary-box/)
   * [Process List](https://designsystem.digital.gov/components/process-list/)
2. Accordions button
3. Alerts button
4. [Grid layout]( https://designsystem.digital.gov/utilities/layout-grid/)
5. Table properties
   * Add abiity to make tables borderless, scrollable,
     stackable/responsive, and sortable with USWDS classes.
6. Submodule for integrating with paragraphs_entity_embed

## REQUIREMENTS

1.x branch
* PHP > 7.4
* Ckeditor4 module (core or contrib)
* USWDS Library (Recommend following steps for
  see https://www.drupal.org/project/uswds_base)
* For Ckeditor Templates to work you will need to include the
  templates' plugin. See Drupal page for how to install.
* For USWDS Paragraphs profile to work you will need
  https://www.drupal.org/project/uswds_paragraph_components.

2.x branch
* PHP > 8
* Ckeditor5 module (core)
* USWDS Library (Recommend following steps for
  see https://www.drupal.org/project/uswds_base)

## INSTALLATION

Install as you would normally install a contributed Drupal module.
Visit: https://www.drupal.org/docs/extending-drupal/installing-drupal-modules
for further information.


## CONFIGURATION

Each component requires specific configuration

#### CKEditor5 Integration (2.x branch)
Filtering is automatic with ckeditor5.
1. CKEditor5 Embedded Content
   * Move button into ckeditor
2. Accordion button
   * Move button into ckeditor
3. USWDS Overrides
   * Configuration option in editor. Check each option you wish to apply.
4. USWDS Table Attributes
   * Configuration option in editor. Check if you want to apply.
   * Enable USWDS Stacked Table Attributes CK5 filter.
   * May need to add "div" to sourc editing section.

#### CKEditor4 (1.x branch)
If filtering HTML be sure to include the following
```
<a href class> <ul type class> <ol class> <li class> <table class>
<tbody> <thead> <tfoot> <th data-sortable scope role data-label>
<td role data-label> <tr scope class> <div class>
```
* Accordion
  1. Go to the text profile you wish to include USWDS accordions.
  2. Move the Accordion button into the toolbar.
* Alerts
  1. Go to the text profile you wish to include USWDS alerts.
  2. Move the Alert button into the toolbar
* Grid
  1. Go to the text profile you wish to include USWDS grid templates.
  2. Move the grid button into the toolbar.
* Lists
  1. Go to the text profile you wish to override `<ul>` and `<ol>` lists
  2. In the Ckeditor USWDS Overrides tab
  3. Check Override Lists
* Summary Box / Process List
  1. Go to the text profile you wish to include ckeditor templates
  2. Move the templates button into the toolbar.
* Table
  1. Go to the text profile you wish to include USWDS table.
  2. Under "CKEditor plugin settings" make sure
     "Override table plugin with USWDS" is checked. By default, it will be.
  3. If you want to use USWDS table stacked click
     "USWDS Stacked Table Attributes" filter

## MAINTAINERS

Current maintainers:
* Stephen Mustgrave (smustgrave) (https://www.drupal.org/u/smustgrave)
