import { Plugin } from "ckeditor5/src/core";
import { Widget, toWidget, toWidgetEditable } from "ckeditor5/src/widget";
import InsertUswdsGridCommand from "./command";

/**
 * Defines the editing commands for BS Grid.
 */
export default class UswdsGridEditing extends Plugin {
  /**
   * @inheritdoc
   */
  static get requires() {
    return [Widget];
  }

  /**
   * @inheritdoc
   */
  static get pluginName() {
    return "UswdsGridEditing";
  }

  constructor(editor) {
    super(editor);
    this.attrs = {
      class: "class",
      "data-row-none": "data-row-none",
      "data-row-sm": "data-row-sm",
      "data-row-md": "data-row-md",
      "data-row-lg": "data-row-lg",
      "data-row-xl": "data-row-xl",
      "data-row-xxl": "data-row-xxl",
    };
  }

  init() {
    const options = this.editor.config.get("uswdsGrid");
    if (!options) {
      return;
    }

    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   * <uswdsGrid>
   *    <uswdsGridContainer>
   *      <uswdsGridRow>
   *        <uswdsGridCol .. />
   *      </uswdsGridRow>
   *    </gridContainer>
   * </bootstrapGrid>
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    const { schema } = this.editor.model;
    schema.register("uswdsGrid", {
      allowWhere: "$block",
      isLimit: true,
      isObject: true,
      allowAttributes: ["class"],
    });
    schema.register("uswdsGridContainer", {
      isLimit: true,
      allowIn: "uswdsGrid",
      isInline: true,
      allowAttributes: ["class"],
    });
    schema.register("uswdsGridRow", {
      isLimit: true,
      allowIn: ["uswdsGrid", "uswdsGridContainer"],
      isInline: true,
      allowAttributes: Object.keys(this.attrs),
    });
    schema.register("uswdsGridCol", {
      allowIn: "uswdsGridRow",
      isInline: true,
      allowContentOf: "$root",
      allowAttributes: ["class"],
    });
  }

  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    const { conversion } = this.editor;

    // <uswdsGrid>
    conversion.for("upcast").elementToElement({
      model: "uswdsGrid",
      view: {
        name: "div",
        classes: "uswds_grid",
      },
    });

    conversion.for("downcast").elementToElement({
      model: "uswdsGrid",
      view: (modelElement, { writer }) => {
        const container = writer.createContainerElement("div");
        writer.setCustomProperty("uswdsGrid", true, container);
        return toWidget(container, writer, { label: "BS Grid" });
      },
    });

    // <uswdsGridContainer>
    conversion.for("upcast").elementToElement({
      model: "uswdsGridContainer",
      view: {
        name: "div",
      },
    });

    conversion.for("downcast").elementToElement({
      model: "uswdsGridContainer",
      view: (modelElement, { writer }) => {
        const container = writer.createContainerElement("div");
        writer.setCustomProperty("uswdsGridContainer", true, container);
        return toWidget(container, writer, { label: "BS Grid Container" });
      },
    });

    // <uswdsGridRow>
    conversion.for("upcast").elementToElement({
      model: "uswdsGridRow",
      view: {
        name: "div",
        classes: ["row"],
      },
      converterPriority: "high",
    });

    conversion.for("downcast").elementToElement({
      model: "uswdsGridRow",
      view: (modelElement, { writer }) => {
        const rowAttributes = {
          "data-row-none": modelElement.getAttribute("data-row-none"),
          "data-row-sm": modelElement.getAttribute("data-row-sm"),
          "data-row-md": modelElement.getAttribute("data-row-md"),
          "data-row-lg": modelElement.getAttribute("data-row-lg"),
          "data-row-xl": modelElement.getAttribute("data-row-xl"),
          "data-row-xxl": modelElement.getAttribute("data-row-xxl"),
        };
        const container = writer.createContainerElement("div", rowAttributes);
        writer.setCustomProperty("uswdsGridRow", true, container);
        return toWidget(container, writer, { label: "BS Grid Row" });
      },
    });

    // <uswdsGridCol>
    conversion.for("upcast").elementToElement({
      model: "uswdsGridCol",
      view: {
        name: "div",
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "uswdsGridCol",
      view: (modelElement, { writer }) => {
        const element = writer.createEditableElement("div");
        writer.setCustomProperty("uswdsGridCol", true, element);
        return toWidgetEditable(element, writer);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "uswdsGridCol",
      view: {
        name: "div",
        classes: "",
      },
    });

    // Set attributeToAttribute conversion for all supported attributes.
    Object.keys(this.attrs).forEach((modelKey) => {
      const attributeMapping = {
        model: {
          key: modelKey,
          name: "uswdsGridRow",
        },
        view: {
          name: "div",
          key: this.attrs[modelKey],
        },
      };
      conversion.for("downcast").attributeToAttribute(attributeMapping);
      conversion.for("upcast").attributeToAttribute(attributeMapping);
    });

    conversion.attributeToAttribute({ model: "class", view: "class" });
  }

  /**
   * Defines the BS Grid commands.
   *
   * @private
   */
  _defineCommands() {
    this.editor.commands.add(
      "insertUswdsGrid",
      new InsertUswdsGridCommand(this.editor)
    );
  }
}
