CKEDITOR.plugins.add('uswds_overrides', {
  init: function (editor) {
    CKEDITOR.on('instanceReady', function (ev) {

      ev.editor.dataProcessor.htmlFilter.addRules({
        elements: {
          $: function (element) {

            if (element.name === 'ul' || element.name === 'ol') {
              if (!element.attributes.class) {
                element.attributes.class = 'usa-list';
              }
            }
          }
        }
      });
    });
  }
});
