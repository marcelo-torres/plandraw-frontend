import {
    assign
} from 'min-dash';

import {
    getLabel
} from './LabelUtil';
 
 // plug-in implemenentation
 export default function LabelEditingProvider(eventBus, canvas, modeling, textRenderer, directEditing) {

    this._canvas = canvas;
    this._modeling = modeling;
    this._textRenderer = textRenderer;

    directEditing.registerProvider(this);

    /*
    eventBus.on('shape.added', function(event) {
        console.log('shape was added to the diagram: ', event.element);
    });
    */

    var labelEditing = this;
    eventBus.on('element.label.changed', function(event) {
      labelEditing.update(event.element, event.newLabel);
    });

    eventBus.on('element.dblclick', function(event) {
        //console.log('event.element ', event.element);
        activateDirectEdit(event.element, true);
    });

    // complete on followup canvas operation
    eventBus.on([
        'autoPlace.start',
        'canvas.viewbox.changing',
        'drag.init',
        'element.mousedown',
        'popupMenu.open'
    ], function(event) {
        if (directEditing.isActive()) {
            directEditing.complete();
        }
    });

    // cancel on command stack changes
    eventBus.on([ 'commandStack.changed' ], function(e) {
        if (directEditing.isActive()) {
            directEditing.cancel();
        }
    });

    function activateDirectEdit(element, force) {
        directEditing.activate(element);
    }
 }

 LabelEditingProvider.$inject = [
    'eventBus',
    'canvas',
    'modeling',
    'textRenderer',
    'directEditing'
  ];

/**
 * Activate direct editing for activities and text annotations.
 *
 * @param  {djs.model.Base} element
 *
 * @return {Object} an object with properties bounds (position and size), text and options
 */
 LabelEditingProvider.prototype.activate = function(element) {

    // text
    var text = getLabel(element);

    if (text === undefined) {
        return;
    }

    var context = {
        text: text
    };

    // bounds
    var bounds = this.getEditingBBox(element);

    assign(context, bounds);

    var options = {align: 'center-middle'};

    // tasks
    if (false) {
        assign(options, {
        centerVertically: true
        });
    }

    // external labels
    /*if (isLabelExternal(element)) {
        assign(options, {
        autoResize: true
        });
    }*/

    // text annotations
    /*if (is(element, 'bpmn:TextAnnotation')) {
        assign(options, {
        resizable: true,
        autoResize: true
        });
    }*/

    assign(context, {
        options: options
    });

    return context;
};
  
/**
 * Get the editing bounding box based on the element's size and position
 *
 * @param  {djs.model.Base} element
 *
 * @return {Object} an object containing information about position
 *                  and size (fixed or minimum and/or maximum)
 */
 LabelEditingProvider.prototype.getEditingBBox = function(element) {
    var canvas = this._canvas;
  
    var target = element.label || element;
  
    var bbox = canvas.getAbsoluteBBox(target);
  
    var mid = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
  
    // default position
    var bounds = { x: bbox.x, y: bbox.y };
  
    var zoom = canvas.zoom();
  
    var defaultStyle = this._textRenderer.getDefaultStyle(),
        externalStyle = this._textRenderer.getExternalStyle();
  
    // take zoom into account
    var externalFontSize = externalStyle.fontSize * zoom,
        externalLineHeight = externalStyle.lineHeight,
        defaultFontSize = defaultStyle.fontSize * zoom,
        defaultLineHeight = defaultStyle.lineHeight;
  
    var style = {
      fontFamily: this._textRenderer.getDefaultStyle().fontFamily,
      fontWeight: this._textRenderer.getDefaultStyle().fontWeight,
    }

    assign(bounds, {
      width: bbox.width,
      height: bbox.height
    });

    assign(style, {
      fontSize: defaultFontSize + 'px',
      lineHeight: defaultLineHeight,
      paddingTop: (7 * zoom) + 'px',
      paddingBottom: (7 * zoom) + 'px',
      paddingLeft: (5 * zoom) + 'px',
      paddingRight: (5 * zoom) + 'px'
    });
  
    // internal labels for tasks and collapsed call activities,
    // sub processes and participants
    /*if (isAny(element, [ 'bpmn:Task', 'bpmn:CallActivity']) ||
        isCollapsedPool(element) ||
        isCollapsedSubProcess(element)) {
  
      assign(bounds, {
        width: bbox.width,
        height: bbox.height
      });
  
      assign(style, {
        fontSize: defaultFontSize + 'px',
        lineHeight: defaultLineHeight,
        paddingTop: (7 * zoom) + 'px',
        paddingBottom: (7 * zoom) + 'px',
        paddingLeft: (5 * zoom) + 'px',
        paddingRight: (5 * zoom) + 'px'
      });
    }*/

  

  
    // external label not yet created
    /*if (isLabelExternal(target)
        && !hasExternalLabel(target)
        && !isLabel(target)) {
  
      var externalLabelMid = getExternalLabelMid(element);
  
      var absoluteBBox = canvas.getAbsoluteBBox({
        x: externalLabelMid.x,
        y: externalLabelMid.y,
        width: 0,
        height: 0
      });
  
      var height = externalFontSize + paddingTop + paddingBottom;
  
      assign(bounds, {
        width: width,
        height: height,
        x: absoluteBBox.x - width / 2,
        y: absoluteBBox.y - height / 2
      });
  
      assign(style, {
        fontSize: externalFontSize + 'px',
        lineHeight: externalLineHeight,
        paddingTop: paddingTop + 'px',
        paddingBottom: paddingBottom + 'px'
      });
    }*/
  
    /*// text annotations
    if (is(element, 'bpmn:TextAnnotation')) {
      assign(bounds, {
        width: bbox.width,
        height: bbox.height,
        minWidth: 30 * zoom,
        minHeight: 10 * zoom
      });
  
      assign(style, {
        textAlign: 'left',
        paddingTop: (5 * zoom) + 'px',
        paddingBottom: (7 * zoom) + 'px',
        paddingLeft: (7 * zoom) + 'px',
        paddingRight: (5 * zoom) + 'px',
        fontSize: defaultFontSize + 'px',
        lineHeight: defaultLineHeight
      });
    }*/
  
    return { bounds: bounds, style: style };
};


LabelEditingProvider.prototype.update = function(
      element, newLabel,
      activeContextText, bounds) {
  
    var newBounds,
        bbox;

    /*
    if (is(element, 'bpmn:TextAnnotation')) {

        bbox = this._canvas.getAbsoluteBBox(element);

        newBounds = {
        x: element.x,
        y: element.y,
        width: element.width / bbox.width * bounds.width,
        height: element.height / bbox.height * bounds.height
        };
    }

    if (is(element, 'bpmn:Group')) {

        var businessObject = getBusinessObject(element);

        // initialize categoryValue if not existing
        if (!businessObject.categoryValueRef) {

        var rootElement = this._canvas.getRootElement(),
            definitions = getBusinessObject(rootElement).$parent;

        var categoryValue = createCategoryValue(definitions, this._bpmnFactory);

        getBusinessObject(element).categoryValueRef = categoryValue;
        }

    }*/

    if (isEmptyText(newLabel)) {
        newLabel = null;
    }

    this._modeling.updateLabel(element, newLabel, newBounds);
};

function isEmptyText(label) {
  return !label || !label.trim();
}
  