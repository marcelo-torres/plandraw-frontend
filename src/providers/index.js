import ExampleContextPadProvider from './ExampleContextPadProvider';
import ExamplePaletteProvider from './ExamplePaletteProvider';
import ExampleRuleProvider from './ExampleRuleProvider';
import MenuLoader from './../menu/';

export default {
  __init__: [
    'exampleContextPadProvider',
    'examplePaletteProvider',
    'exampleRuleProvider',
  ],
  __depends__: [
    MenuLoader
  ],
  exampleContextPadProvider: [ 'type', ExampleContextPadProvider ],
  examplePaletteProvider: [ 'type', ExamplePaletteProvider ],
  exampleRuleProvider: [ 'type', ExampleRuleProvider ],
};
