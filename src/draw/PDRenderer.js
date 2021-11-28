import inherits from 'inherits';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  isObject,
  assign,
  forEach
} from 'min-dash';

import {
  getLabel
} from '../label/LabelUtil';

import {
  componentsToPath,
  createLine
} from 'diagram-js/lib/util/RenderUtil';

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  classes as svgClasses
} from 'tiny-svg';

import {
  isFrameElement
} from 'diagram-js/lib/util/Elements';

// apply default renderer with lowest possible priority
// so that it only kicks in if noone else could render
var DEFAULT_RENDER_PRIORITY = 1;

/**
 * The default renderer used for shapes and connections.
 *
 * @param {EventBus} eventBus
 * @param {Styles} styles
 */
export default function PDRenderer(eventBus, styles, textRenderer) {

  //
  BaseRenderer.call(this, eventBus, DEFAULT_RENDER_PRIORITY);

  this.CONNECTION_STYLE = styles.style([ 'no-fill' ], { strokeWidth: 5, stroke: 'fuchsia' });
  this.SHAPE_STYLE = styles.style({ fill: 'white', stroke: 'fuchsia', strokeWidth: 2 });
  this.FRAME_STYLE = styles.style([ 'no-fill' ], { stroke: 'fuchsia', strokeDasharray: 4, strokeWidth: 2 });

  this.textRenderer = textRenderer;
}

inherits(PDRenderer, BaseRenderer);


PDRenderer.prototype.canRender = function() {
  return true;
};

PDRenderer.prototype.drawShape = function drawShape(visuals, element) {
  var aux = this.textRenderer;

  function renderLabel(parentGfx, label, options) {

    options = assign({
      size: {
        width: 100
      }
    }, options);

    var text = aux.createText(label || '', options);

    svgClasses(text).add('djs-label');

    svgAppend(parentGfx, text);

    return text;
  }

  function renderEmbeddedLabel(parentGfx, element, align) {
    var semantic = element.businessObject; //getSemantic(element);

    if(semantic !== undefined && semantic.name !== null) {
      var text = semantic.name;
    } else {
      var text = '';
    }

    return renderLabel(parentGfx, text, {
      box: element,
      align: align,
      padding: 5,
      style: {
        fill: '#000' //getLabelColor(element, defaultLabelColor, defaultStrokeColor)
      }
    });
  }
  
  var rect = svgCreate('rect');

  svgAttr(rect, {
    x: 0,
    y: 0,
    width: element.width || 0,
    height: element.height || 0
  });

  if (isFrameElement(element)) {
    svgAttr(rect, this.FRAME_STYLE);
  } else {
    svgAttr(rect, this.SHAPE_STYLE);
  }

  svgAppend(visuals, rect);

  if(getLabel(element) != '') {
    renderEmbeddedLabel(visuals, element, 'center-middle');
  }

  return rect;
};

PDRenderer.prototype.drawConnection = function drawConnection(visuals, connection) {

  var line = createLine(connection.waypoints, this.CONNECTION_STYLE);
  svgAppend(visuals, line);

  return line;
};

PDRenderer.prototype.getShapePath = function getShapePath(shape) {

  var x = shape.x,
      y = shape.y,
      width = shape.width,
      height = shape.height;

  var shapePath = [
    ['M', x, y],
    ['l', width, 0],
    ['l', 0, height],
    ['l', -width, 0],
    ['z']
  ];

  return componentsToPath(shapePath);
};

PDRenderer.prototype.getConnectionPath = function getConnectionPath(connection) {
  var waypoints = connection.waypoints;

  var idx, point, connectionPath = [];

  for (idx = 0; (point = waypoints[idx]); idx++) {

    // take invisible docking into account
    // when creating the path
    point = point.original || point;

    connectionPath.push([ idx === 0 ? 'M' : 'L', point.x, point.y ]);
  }

  return componentsToPath(connectionPath);
};


PDRenderer.$inject = [ 'eventBus', 'styles', 'textRenderer' ];


function prependTo(newNode, parentNode, siblingNode) {

  var node = siblingNode || parentNode.firstChild;

  // do not prepend node to itself to prevent IE from crashing
  // https://github.com/bpmn-io/bpmn-js/issues/746
  if (newNode === node) {
    return;
  }

  parentNode.insertBefore(newNode, node);
}