CKEDITOR.dialog.add('alertsDialog', function (editor) {
  return {
    title: 'USWDS Alert Properties',
    minWidth: 400,
    minHeight: 200,
    contents: [
      {
        id: 'tab-basic',
        label: 'Basic Settings',
        elements: [
          {
            type: 'checkbox',
            id: 'slim',
            labelStyle: 'display: inline',
            label: 'Slim Alert',
            'default': '',

            setup: function (element) {
              let val = element.getParent().hasClass('usa-alert--slim');
              this.setValue(val);
            },

            commit: function (element) {
              if (this.getValue()) {
                if (element.hasClass('usa-alert__body')) {
                  element.getParent().addClass('usa-alert--slim');
                  element.findOne('h4').remove();
                }
                else {
                  element.addClass('usa-alert--slim');
                  element.findOne('h4').remove();
                }
              }
              else {
                if (element.hasClass('usa-alert__body')) {
                  element.getParent().removeClass('usa-alert--slim');

                  let header = editor.document.createElement('h4');
                  header.addClass('usa-alert__heading');
                  header.setText("ALERT HEADER");

                  element.append(header, true);
                }
              }
            }
          },
          {
            type: 'checkbox',
            id: 'no_icons',
            labelStyle: 'display: inline',
            label: 'No Icons',
            'default': '',

            setup: function (element) {
              let val = element.getParent().hasClass('usa-alert--no-icon');
              this.setValue(val);
            },

            commit: function (element) {
              if (this.getValue()) {
                if (element.hasClass('usa-alert__body')) {
                  element.getParent().addClass('usa-alert--no-icon');
                }
                else {
                  element.addClass('usa-alert--no-icon');
                }
              }
              else {
                if (element.hasClass('usa-alert__body')) {
                  element.getParent().removeClass('usa-alert--no-icon');
                }
              }
            }
          },
          {
            type: 'select',
            id: 'severity',
            label: 'Select alert severity',
            items: [['Informative', 'info'], ['Warning', 'warning'], ['Error', 'error'], ['Success', 'success']],
            'default': 'info',

            setup: function (element) {
              let val = element.getParent();
              let severity = 'info';
              if (val.hasClass('usa-alert--info')) {
                severity = 'info';
              }
              else if (val.hasClass('usa-alert--warning')) {
                severity = 'warning';
              }
              else if (val.hasClass('usa-alert--error')) {
                severity = 'error';
              }
              else if (val.hasClass('usa-alert--success')) {
                severity = 'success';
              }
              this.setValue(severity);
            },

            commit: function (element) {
              if (this.getValue()) {
                if (element.hasClass('usa-alert__body')) {
                  element.getParent().removeClass('usa-alert--info');
                  element.getParent().removeClass('usa-alert--warning');
                  element.getParent().removeClass('usa-alert--error');
                  element.getParent().removeClass('usa-alert--success');
                }
                else {
                  element.removeClass('usa-alert--info');
                  element.removeClass('usa-alert--warning');
                  element.removeClass('usa-alert--error');
                  element.removeClass('usa-alert--success');
                }

                let className = 'usa-alert--info';
                switch (this.getValue()) {
                  case 'info':
                    className = 'usa-alert--info';
                    break;

                  case 'warning':
                    className = 'usa-alert--warning';
                    break;

                  case 'error':
                    className = 'usa-alert--error';
                    break;

                  case 'success':
                    className = 'usa-alert--success';
                    break;

                  default:
                    break;
                }

                if (element.hasClass('usa-alert__body')) {
                  element.getParent().addClass(className);
                }
                else {
                  element.addClass(className);
                }
              }
            }
          },
          {
            type: 'html',
            html: '<h3>See <a class="link" href="https://designsystem.digital.gov/components/alert/">' + Drupal.t('USWDS Alerts page')
              + '</a> for more detail</h3>'
          }
        ]
      }
    ],

    onShow: function () {
      let selection = editor.getSelection();
      let element = selection.getStartElement();

      if (element) {
        element = element.getAscendant('div');
      }

      if (!element || element.getName() !== 'div') {
        let containerDiv = editor.document.createElement('div');
        let severity = 'usa-alert--info';
        containerDiv.addClass('usa-alert').addClass(severity);

        let bodyDiv = editor.document.createElement('div');
        bodyDiv.addClass('usa-alert__body');

        let header = editor.document.createElement('h4');
        header.addClass('usa-alert__heading');
        header.setText("ALERT HEADER");

        let body = editor.document.createElement('p');
        body.addClass('usa-alert__text');
        body.setText('ALERT BODY TEXT');

        bodyDiv.append(header);
        bodyDiv.append(body);
        containerDiv.append(bodyDiv);

        element = containerDiv;

        this.insertMode = true;
      }
      else {
        this.insertMode = false;
      }

      this.element = element;
      if (!this.insertMode) {
        this.setupContent(this.element);
      }
    },

    onOk: function () {
      let alert = this.element;
      this.commitContent(alert);

      if (this.insertMode) {
        editor.insertElement(alert);
      }
    }
  };

});
