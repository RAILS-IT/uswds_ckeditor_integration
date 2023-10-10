(function () {

  let commitValue = function (data) {
    let id = this.id;
    if (!data.info) {
      data.info = {};
    }
    data.info[id] = this.getValue();
  };

  function accordionDialog(editor, command) {
    let makeElement = function (name) {
      return new CKEDITOR.dom.element(name, editor.document);
    };

    return {
      title: "USWDS Accordion",
      minWidth: 400,
      minHeight: CKEDITOR.env.ie ? 400 : 280,

      onShow: function () {
        let selection = editor.getSelection(),
            ranges = selection.getRanges(),
            accordion;

        if (command === 'accordionProperties') {
          let selected = selection.getSelectedElement();
          if (selected && selected.is('div')) {
            accordion = selected;
          }
          else if (ranges.length > 0) {
            if (CKEDITOR.env.webkit) {
              ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
            }

            accordion = editor.elementPath(ranges[0].getCommonAncestor(true)).contains(function (element) {
              if (element.is('div') && element.hasClass('usa-accordion')) {
                return true;
              }
            }, 1);
          }

          this._.selectedElement = accordion;
          this.setupContent(accordion);
        }
      },
      onOk: function () {
        let accordion = this._.selectedElement || makeElement('div'),
            data = {};
        this.commitContent(data, accordion);

        let info = data.info;
        if (data.info && accordion) {
          if (info['accordionBordered']) {
            accordion.addClass('usa-accordion--bordered');
          }
          else {
            accordion.removeClass('usa-accordion--bordered');
          }

          if (info['multiselect']) {
            accordion.setAttribute('aria-multiselectable', 'true');
          }
          else {
            accordion.removeAttribute('aria-multiselectable');
          }

          let buttons = accordion.find('.usa-accordion__button');
          if (info['accordionCollapsed']) {
            buttons.toArray().forEach(function (button) {
              button.setAttribute('aria-expanded', 'false');
            });
          }
          else {
            buttons.getItem(0).setAttribute('aria-expanded', 'true');
          }
        }

      },
      contents: [{
        id: 'info',
        label: "USWDS Accordion",
        elements: [{
          type: 'hbox',
          widths: ['50%', '50%'],
          styles: ['vertical-align:top'],
          children: [{
            type: 'hbox',
            padding: 0,
            children: [{
              type: 'vbox',
              widths: ['12em'],
              children: [
                {
                  type: 'checkbox',
                  id: 'accordionBordered',
                  labelStyle: 'display: inline',
                  label: 'Make content region bordered.',
                  'default': '',
                  setup: function (accordion) {
                    let val = accordion.hasClass('usa-accordion--bordered');
                    this.setValue(val);
                  },
                  commit: commitValue
                },
                {
                  type: 'checkbox',
                  id: 'multiselect',
                  labelStyle: 'display: inline',
                  label: 'Allow for multiselect (multiple tabs open at once)',
                  'default': '',
                  setup: function (accordion) {
                    let val = accordion.hasAttribute('aria-multiselectable');
                    this.setValue(val);
                  },
                  commit: commitValue
                },
                {
                  type: 'checkbox',
                  id: 'accordionCollapsed',
                  labelStyle: 'display: inline',
                  label: 'Start collapsed',
                  'default': '',
                  setup: function (accordion) {
                    let button = accordion.findOne('.usa-accordion__button');
                    let val = button.getAttribute('aria-expanded') === 'false';
                    this.setValue(val);
                  },
                  commit: commitValue
                }]
            }]
          }]
        }]
      },
      ]
    };
  }

  CKEDITOR.dialog.add('uswds_accordion', function (editor) {
    return accordionDialog(editor, 'accordion');
  });
  CKEDITOR.dialog.add('uswds_accordionProperties', function (editor) {
    return accordionDialog(editor, 'accordionProperties');
  });
})();
