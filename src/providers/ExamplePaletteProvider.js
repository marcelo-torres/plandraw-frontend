/**
 * A example palette provider.
 */
export default function ExamplePaletteProvider(create, elementFactory, lassoTool, palette, spaceTool) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._lassoTool = lassoTool;
  this._palette = palette;
  this._spaceTool = spaceTool;
  //this._handTool = handTool;
  //this._globalConnect = globalConnect

  palette.registerProvider(this);
}

ExamplePaletteProvider.$inject = [
  'create',
  'elementFactory',
  'lassoTool',
  'palette'
];


ExamplePaletteProvider.prototype.getPaletteEntries = function() {
  var create = this._create,
      elementFactory = this._elementFactory,
      lassoTool = this._lassoTool;

  return {
    'lasso-tool': {
      group: 'tools',
      className: 'palette-icon-lasso-tool',
      title: 'Activate Lasso Tool',
      action: {
        click: function(event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    'tool-separator': {
      group: 'tools',
      separator: true
    },
    /*'space-tool': {
      group: 'tools',
      className: 'palette-icon-lasso-tool',
      title: translate('Activate the create/remove space tool'),
      action: {
        click: function(event) {
          spaceTool.activateSelection(event);
        }
      }
    },*/
    'create-frame': {
      group: 'create',
      className: 'palette-icon-create-frame',
      title: 'Create Frame',
      action: {
        click: function() {
          var shape = elementFactory.createShape({
            width: 300,
            height: 200,
            isFrame: true
          });

          create.start(event, shape);
        }
      }
    },
    'create-shape': {
      group: 'create',
      className: 'palette-icon-create-shape',
      title: 'Create Shape',
      action: {
        click: function() {
          var shape = elementFactory.createShape({
            width: 100,
            height: 80,
            businessObject: {
              type: 'service',
              name: 'sem nome',
              id: '',
              properties: [
                {
                  writable: false,
                  name: 'Owner',
                  value: ''
                },
                {
                  writable: false,
                  name: 'Float',
                  value: ''
                },
                {
                  writable: true,
                  name: 'Flok',
                  value: ''
                }
              ]
            }
          });

          create.start(event, shape);
        }
      }
    },
    'create-component': {
      group: 'create',
      className: 'palette-icon-create-shape',
      title: 'Create Component',
      action: {
        click: function() {
          var shape = elementFactory.createShape({
            width: 150,
            height: 80,
            businessObject: {
              type: 'service',
              name: '',
              id: '',
              properties: []
            }
          });

          create.start(event, shape);
        }
      }
    }
  };
};