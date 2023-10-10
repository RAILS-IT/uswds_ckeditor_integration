import { Plugin } from 'ckeditor5/src/core';
import SetTableClass from './commands/setTableClass';

/**
 * CKEditor 5 plugins do not work directly with the DOM. They are defined as
 * plugin-specific data models that are then converted to markup that
 * is inserted in the DOM.
 *
 * This file has the logic for defining the simpleBox model, and for how it is
 * converted to standard DOM markup.
 */
export default class UswdsTableContentItemsEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'UswdsTableContentItemsEditing';
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;
    const model = editor.model;

    const uswds_classes = [
      { id: 'borderless', classes: 'usa-table--borderless' },
      { id: 'scrollable', classes: 'usa-table--scrollable' },
      { id: 'stacked', classes: 'usa-table--stacked' },
      { id: 'sortable', classes: 'usa-table--sortable' },
      { id: 'striped', classes: 'usa-table--striped' },
    ];

    model.schema.extend( 'table', {
      allowAttributes: [ 'borderless', 'scrollable', 'stacked', 'sortable', 'class' ]
    } );

    // Define all the commands.
    editor.commands.add( 'setBorderlessClass', new SetTableClass( editor, 'borderless' ) );
    editor.commands.add( 'setScrollableClass', new SetTableClass( editor, 'scrollable' ) );
    editor.commands.add( 'setStackedClass', new SetTableClass( editor, 'stacked' ) );
    editor.commands.add( 'setSortableClass', new SetTableClass( editor, 'sortable' ) );
    editor.commands.add( 'setStripedClass', new SetTableClass( editor, 'striped' ) );

    uswds_classes.forEach( ( tableClass ) => {
      editor.model.schema.extend( 'table', { allowAttributes: tableClass.id } );

      editor.conversion.for( 'upcast' ).attributeToAttribute( {
        model: {
          name: 'table',
          key: tableClass.id,
          value: true
        },
        view: {
          key: 'class',
          value: tableClass.classes
        }
      } );

      const val = 'attribute:' + tableClass.id + ':table';

      // Apply attribute to table element no matter if it's needed or not.
      editor.conversion.for( 'downcast' ).add( dispatcher => {
        dispatcher.on( val, ( evt, data, conversionApi ) => {
          const viewElement = conversionApi.mapper.toViewElement( data.item );
          conversionApi.writer.addClass( tableClass.classes, viewElement );
        } );
      } );

      if ( tableClass.id === 'scrollable' ) {
        editor.conversion.for( 'downcast' ).add( dispatcher => {
          dispatcher.on( val, ( evt, data, conversionApi ) => {
            if ( data.item.name === 'table' ) {
              const viewElement = conversionApi.mapper.toViewElement( data.item );
              const { writer, mapper } = conversionApi;

              // Translate the position in the model to a position in the view.
              const viewPosition = mapper.toViewPosition( data.range.start );

              // Create a <div> element that will be inserted into the view at
              // the `viewPosition`.
              const div = writer.createContainerElement( 'div', { class: 'usa-table-container--scrollable' } );

              // Create the <span> element that will be inserted into the div
              writer.insert( writer.createPositionAt( div, 0 ), viewElement );

              // Add the newly created view element to the view.
              writer.insert( viewPosition, div );

              // Remember to stop the event propagation.
              evt.stop();
            }
          } );
        } );
      }

      if ( tableClass.id === 'sortable' ) {
        editor.conversion.for( 'downcast' ).add( dispatcher => {
          dispatcher.on( val, ( evt, data, conversionApi ) => {
            if ( data.item.name === 'table' ) {
              const { writer, mapper } = conversionApi;

              // Translate the position in the model to a position in the view.
              const viewPosition = mapper.toViewPosition( data.range.end );

              // Create a <div> element that will be inserted into the view at
              // the `viewPosition`.
              const div = writer.createEmptyElement( 'div', { class: 'usa-sr-only usa-table__announcement-region', 'aria-live': 'polite' } );

              // Add the newly created view element to the view.
              writer.insert( viewPosition, div );

              // Remember to stop the event propagation.
              evt.stop();
            }
          } );
        } );
      }
    } );
  }
}
