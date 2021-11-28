import DirectEditingModule from 'diagram-js-direct-editing';
import MyLoggingPlugin from './MyLogginPlugin';
import TextRenderer from './TextRenderer';

export default {
  __depends__: [
    DirectEditingModule
  ],
  __init__: [
    'myLoggingPlugin',
    'textRenderer'
  ],
  myLoggingPlugin: [ 'type', MyLoggingPlugin ],
  textRenderer: [ 'type', TextRenderer ]
};
