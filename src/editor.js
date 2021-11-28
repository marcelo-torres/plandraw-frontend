//import Diagram from 'diagram-js';
import PDDiagram from './PDDiagram';

import ConnectModule from 'diagram-js/lib/features/connect';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import CreateModule from 'diagram-js/lib/features/create';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
//import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import PaletteModule from 'diagram-js/lib/features/palette';
import ResizeModule from 'diagram-js/lib/features/resize';
import RulesModule from 'diagram-js/lib/features/rules';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';


import LabelModule from './label'
import PDModelingModule from './modeling';
//import PDRendererModule from './draw';
import SaverModule from './saving';
import ProvidersModule from './providers';


import CopyPasteModule from 'diagram-js/lib/features/copy-paste';
import KeyBoardModule from 'diagram-js/lib/navigation/keyboard-move';

/**
 * A module that changes the default diagram look.
 */
const ElementStyleModule = {
  __init__: [
    [ 'pdrenderer', function(pdrenderer) {
      // override default styles
      pdrenderer.CONNECTION_STYLE = { fill: 'none', strokeWidth: 5, stroke: '#000' };
      pdrenderer.SHAPE_STYLE = { fill: 'white', stroke: '#000', strokeWidth: 2 };
      pdrenderer.FRAME_STYLE = { fill: 'none', stroke: '#000', strokeDasharray: 4, strokeWidth: 2 };
    } ]
  ]
};


/**
 * Our editor constructor
 *
 * @param { { container: Element, additionalModules?: Array<any> } } options
 *
 * @return {Diagram}
 */
export default function Editor(options) {

  const {
    container,
    additionalModules = []
  } = options;

  // default modules provided by the toolbox
  const builtinModules = [
    ConnectModule,
    ContextPadModule,
    CreateModule,
    LassoToolModule,
    //ModelingModule,
    MoveCanvasModule,
    MoveModule,
    OutlineModule,
    PaletteModule,
    ResizeModule,
    RulesModule,
    SelectionModule,
    ZoomScrollModule,
  ];

  // our own modules, contributing controls, customizations, and more
  const customModules = [
    LabelModule,
    CopyPasteModule, KeyBoardModule,
    PDModelingModule,
    ElementStyleModule,
    SaverModule,
    ProvidersModule
  ];

  return new PDDiagram({
    canvas: {
      container
    },
    modules: [
      ...builtinModules,
      ...customModules,
      ...additionalModules
    ]
  });
}