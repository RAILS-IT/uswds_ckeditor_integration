import { Command } from 'ckeditor5/src/core';

/**
 * The Set USWDS Class command.
 */
export default class SetTableClass extends Command {

  /**
   * @inheritDoc
   */
  constructor( editor, attributeName ) {
    super( editor );

    this.attributeName = attributeName;
  }

  /**
   * @inheritDoc
   */
  refresh() {
    const editor = this.editor;
    const selection = editor.model.document.selection;

    const table = selection.getFirstPosition().findAncestor( 'table' );

    this.isEnabled = !!table;
    if ( table ) {
      this.value = table.hasAttribute( this.attributeName );
    }

    // const editor = this.editor;
    // const selection = editor.model.document.selection;
    // const selectedElement = selection.getSelectedElement();
    // let table = '';
    //
    // if ( selectedElement && selectedElement.is( 'element', 'table' ) ) {
    //   table = selectedElement;
    // }
    // else {
    // }
    //
    // table = selection.getFirstPosition().findAncestor( 'table' );
    // alert(selection)
    //
    // if ( table ) {
    //   this.isEnabled = table.length > 0;
    //   this.value = table.hasAttribute( this.attributeName );
    // }
  }

  /**
   * Executes the command.
   */
  execute( options = {} ) {
    const editor = this.editor;
    const model = this.editor.model;

    const selection = editor.model.document.selection;
    const selectedElement = selection.getSelectedElement();

    let modelTable = '';

    // Is the command triggered from the `tableToolbar`?
    if ( selectedElement && selectedElement.is( 'element', 'table' ) ) {
      modelTable = selectedElement;
    }
    else {
      modelTable = selection.getFirstPosition().findAncestor( 'table' );
    }

    let remove = false;
    if ( modelTable.hasAttribute( this.attributeName ) ) {
      remove = true;
    }

    model.change( writer => {
      if ( remove ) {
        writer.removeAttribute( this.attributeName, modelTable );
      }
      else {
        writer.setAttribute( this.attributeName, true, modelTable );
      }
    } );
  }
}
