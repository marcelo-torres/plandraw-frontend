/**
 *  Extracted from https://github.com/bpmn-io/bpmn-js
 */

import inherits from 'inherits';

import BaseModeling from 'diagram-js/lib/features/modeling/Modeling';

import UpdateLabelHandler from '../label/cmd/UpdateLabelHandler';

/**
 * PD modeling features activator
 *
 * @param {EventBus} eventBus
 * @param {ElementFactory} elementFactory
 * @param {CommandStack} commandStack
 */
 export default function PDModeling(   
    eventBus, elementFactory, commandStack) {

  BaseModeling.call(this, eventBus, elementFactory, commandStack);

}

inherits(PDModeling, BaseModeling);

PDModeling.$inject = [
    'eventBus',
    'elementFactory',
    'commandStack',
];



PDModeling.prototype.getHandlers = function() {
    var handlers = BaseModeling.prototype.getHandlers.call(this);
    
    // TODO 
    // handlers['element.setColor'] = SetColorHandler;
    handlers['element.updateLabel'] = UpdateLabelHandler;
     
    return handlers;
};

PDModeling.prototype.updateLabel = function(element, newLabel, newBounds, hints) {
    this._commandStack.execute('element.updateLabel', {
      element: element,
      newLabel: newLabel,
      newBounds: newBounds,
      hints: hints || {}
    });
};

PDModeling.prototype.setColor = function(elements, colors) {
    /*if (!elements.length) {
      elements = [ elements ];
    }
  
    this._commandStack.execute('element.setColor', {
      elements: elements,
      colors: colors
    });*/
};
  
PDModeling.prototype.connect = function(source, target, attrs, hints) {
  var parentIndex = 0; // connections must be rendered behind other elements
  return this.createConnection(source, target, parentIndex, attrs || {}, source.parent, hints);
};


PDModeling.prototype.createConnection = function(source, target, parentIndex, connection, parent, hints) {
  var connection = BaseModeling.prototype.createConnection.call(this, source, target, parentIndex, connection, parent, hints);
  connection._type = "Connection";
  return connection;
}

PDModeling.prototype.createShape = function(shape, position, target, parentIndex, hints) {
  var shape = BaseModeling.prototype.createShape.call(this, shape, position, target, parentIndex, hints);
  shape._type = "Shape";
  return shape;
}