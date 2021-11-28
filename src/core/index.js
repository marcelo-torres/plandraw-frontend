//import DrawModule from '../draw';
import DrawModule from '../draw'

import Canvas from 'diagram-js/lib/core/Canvas';
import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import ElementFactory from 'diagram-js/lib/core/ElementFactory';
import EventBus from 'diagram-js/lib/core/EventBus';
import GraphicsFactory from 'diagram-js/lib/core/GraphicsFactory';

export default {
  __depends__: [ DrawModule ],
  __init__: [ 'canvas' ],
  canvas: [ 'type', Canvas ],
  elementRegistry: [ 'type', ElementRegistry ],
  elementFactory: [ 'type', ElementFactory ],
  eventBus: [ 'type', EventBus ],
  graphicsFactory: [ 'type', GraphicsFactory ]
};