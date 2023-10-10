CKEDITOR.plugins.add('uswds_alerts', {
  icons: 'alerts',
  init: function (editor) {

    editor.addCommand('uswds_alerts', new CKEDITOR.dialogCommand('alertsDialog'));
    editor.ui.addButton('Alerts', {
      label: 'Insert Alerts',
      command: 'uswds_alerts'
    });

    if (editor.contextMenu) {
      editor.addMenuGroup('uswdsAlertGroup');
      editor.addMenuItem('alertItem', {
        label: 'Edit Alert',
        icon: this.path + 'icons/alerts.png',
        command: 'uswds_alerts',
        group: 'uswdsAlertGroup'
      });

      editor.contextMenu.addListener(function (element) {
        let alert = element.getAscendant(function () {
          if (element.getAttributes('class').class) {
            return element.getAttributes('class').class.includes('usa-alert');
          }
        });
        if (alert) {
          return { alertItem: CKEDITOR.TRISTATE_OFF };
        }
      });
    }

    let cssPath = this.path + '/alerts.css';
    editor.on('mode', function () {
      if (editor.mode === 'wysiwyg') {
        this.document.appendStyleSheet(cssPath);
      }
    });

    // Add dialog file
    CKEDITOR.dialog.add('alertsDialog', this.path + 'dialogs/alertsDialog.js');
  }
});
