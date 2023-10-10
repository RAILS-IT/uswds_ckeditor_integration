CKEDITOR.plugins.add('uswds_accordion', {
  requires: 'dialog',
  hidpi: true,
  icons: 'accordion',
  init: function (editor) {

    let currentId = 0;
    // Add CSS for edition state.
    let cssPath = this.path + '/accordion.css';
    editor.on('mode', function () {
      if (editor.mode === 'wysiwyg') {
        let document = editor.getSelection().document;
        let buttons = document.getElementsByTag('button');
        let lastButton = buttons.getItem(buttons.count() - 1);
        if (lastButton) {
          currentId = lastButton.getAttribute('aria-controls');
        }
        this.document.appendStyleSheet(cssPath);
      }
    });

    // Prevent nesting DLs by disabling button.
    editor.on('selectionChange', function (evt) {
      if (editor.readOnly) {
        return;
      }
      let command = editor.getCommand('addAccordionCmd');
      // TODO Change dl
      let element = evt.data.path.lastElement && evt.data.path.lastElement.getAscendant('dl', true);
      if (element) {
        command.setState(CKEDITOR.TRISTATE_DISABLED);
      }
      else {
        command.setState(CKEDITOR.TRISTATE_OFF);
      }
    });

    editor.on('contentDom', function () {
      editor.document.find('.usa-accordion__button').toArray().forEach(function (button) {
        button.on('click', headerClickEvent);
      });
    });

    editor.addCommand('addAccordionCmd', {
      exec: function (editor) {
        currentId++;
        let accordion_html = new CKEDITOR.dom.element.createFromHtml(
            '<div class="usa-accordion">' + getTitle(currentId) + getContent(currentId) + '</div>');
        editor.insertElement(accordion_html);
        accordion_html.find('button').getItem(0).on('click', headerClickEvent);
      }
    });

    // Other command to manipulate tabs.
    editor.addCommand('addAccordionTabBefore', {
      allowedContent: (editor.plugins.dialogadvtab ? editor.plugins.dialogadvtab.allowedContent() : ''),
      exec: function (editor) {
        currentId++;
        let element = editor.getSelection().getStartElement();
        let newHeader = new CKEDITOR.dom.element.createFromHtml(getTitle(currentId));
        let newContent = new CKEDITOR.dom.element.createFromHtml(getContent(currentId));
        if (element.getAscendant('div', true).hasClass('usa-accordion__content')) {
          element = element.getAscendant('div', true).getPrevious();
        }
        else {
          element = element.getAscendant('div', true);
        }
        element.append(newContent, true);
        element.append(newHeader, true);
        newHeader.find('button').getItem(0).on('click', headerClickEvent);
      }
    });

    editor.addCommand('addAccordionTabAfter', {
      allowedContent: (editor.plugins.dialogadvtab ? editor.plugins.dialogadvtab.allowedContent() : ''),
      exec: function (editor) {
        currentId++;
        let element = editor.getSelection().getStartElement();
        let newHeader = new CKEDITOR.dom.element.createFromHtml(getTitle(currentId));
        let newContent = new CKEDITOR.dom.element.createFromHtml(getContent(currentId));
        if (element.getAscendant('div', true).hasClass('usa-accordion__content')) {
          element = element.getAscendant('div', true).getAscendant('div', true);
        }
        else {
          element = element.getAscendant('div', true);
        }
        element.append(newHeader);
        element.append(newContent);
        newHeader.find('button').getItem(0).on('click', headerClickEvent);
      }
    });

    editor.addCommand('removeAccordionTab', {
      exec: function (editor) {
        let element = editor.getSelection().getStartElement();
        let accordionTitle = element.getAscendant(function (el) {
          return el.hasClass && el.hasClass('usa-accordion__heading');
        }, true);
        let accordionContent = element.getAscendant(function (el) {
          return el.hasClass && el.hasClass('usa-accordion__content');
        }, true);
        if (accordionTitle) {
          accordionTitle.getNext().remove();
          accordionTitle.remove();
          currentId--;
        }
        else if (accordionContent) {
          accordionContent.getPrevious().remove();
          accordionContent.remove();
          currentId--;
        }
      }
    });

    function createDef(def) {
      return CKEDITOR.tools.extend(def || {}, {
        contextSensitive: 1,
        refresh: function () {
          this.setState(CKEDITOR.TRISTATE_OFF);
        }
      });
    }

    editor.addCommand('uswds_accordionProperties', new CKEDITOR.dialogCommand('uswds_accordionProperties', createDef()));

    // Add single button.
    editor.ui.addButton('Accordion', {
      command: 'addAccordionCmd',
      icon: this.path + 'icons/accordion.png',
      label: Drupal.t('Insert accordion')
    });

    CKEDITOR.dialog.add('uswds_accordion', this.path + 'dialogs/accordion.js');
    CKEDITOR.dialog.add('uswds_accordionProperties', this.path + 'dialogs/accordion.js');

    // Context menu.
    if (editor.contextMenu) {
      editor.addMenuGroup('uswdsAccordionGroup');

      editor.addMenuItem('accordionTabBeforeItem', {
        label: Drupal.t('Add accordion tab before'),
        icon: this.path + 'icons/accordion.png',
        command: 'addAccordionTabBefore',
        group: 'uswdsAccordionGroup'
      });

      editor.addMenuItem('accordionTabAfterItem', {
        label: Drupal.t('Add accordion tab after'),
        icon: this.path + 'icons/accordion.png',
        command: 'addAccordionTabAfter',
        group: 'uswdsAccordionGroup'
      });

      editor.addMenuItem('removeAccordionTab', {
        label: Drupal.t('Remove accordion tab'),
        icon: this.path + 'icons/accordion.png',
        command: 'removeAccordionTab',
        group: 'uswdsAccordionGroup'
      });

      editor.addMenuItem('accordionProperties', {
        label: Drupal.t('Accordion Properties'),
        icon: this.path + 'icons/accordion.png',
        command: 'uswds_accordionProperties',
        group: 'uswdsAccordionGroup'
      });

      editor.contextMenu.addListener(function (element) {
        let parentEl = element.getAscendant('div', true);
        let grandParentEl = element.getAscendant('div', true);
        if (parentEl === null || grandParentEl === null) {
          return;
        }
        parentEl = parentEl.hasClass("usa-accordion");
        grandParentEl = grandParentEl.hasClass("usa-accordion__content");
        if (parentEl || grandParentEl) {
          return {
            accordionTabBeforeItem: CKEDITOR.TRISTATE_OFF,
            accordionTabAfterItem: CKEDITOR.TRISTATE_OFF,
            removeAccordionTab: CKEDITOR.TRISTATE_OFF,
            accordionProperties: CKEDITOR.TRISTATE_OFF
          };
        }
      });
    }

    function getTitle(currentId) {
      return '<h4 class="usa-accordion__heading"><button class="usa-accordion__button" aria-expanded="true" aria-controls="' + currentId + '">Accordion title (type here)</button></h4>';
    }

    function getContent(currentId) {
      return '<div id="' + currentId + '" class="usa-accordion__content usa-prose"><p>Accordion content (type here)</p></div>';
    }

    function headerClickEvent(evt) {
      let range = editor.createRange(),
          button = evt.data.getTarget();
      range.selectNodeContents(button);
      editor.getSelection().selectRanges([range]);
    }
  }
});
