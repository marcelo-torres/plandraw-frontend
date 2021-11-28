/* global Editor */


// (1) create new editor instance

const diagram = new Editor({
  container: document.querySelector('#container')
});


// (2) draw diagram elements (i.e. import)

const canvas = diagram.get('canvas');
const elementFactory = diagram.get('elementFactory');
const saver = diagram.get('saver');

//saver.load(diagram, canvas, elementFactory);

elementFactory.createRoot();
// add root
var root = elementFactory.createRoot();

canvas.setRootElement(root);

// add shapes
var shape1 = elementFactory.createShape({
  x: 100,
  y: 50,
  width: 100,
  height: 80,
  businessObject: {
    type: 'service',
    name: 'Venda',
    id: 'java-service-vendas',
    properties: [
      {
        writable: false,
        name: 'Owner',
        value: 'Squad de Vendas'
      },
      {
        writable: false,
        name: 'Technical debt',
        value: '12'
      },
      {
        writable: false,
        name: 'Code verage',
        value: '85%'
      }
    ]
  }
});

canvas.addShape(shape1, root);

var shape2 = elementFactory.createShape({
  x: 290,
  y: 220,
  width: 100,
  height: 80,
  businessObject: {
    type: 'service',
    name: 'Estoque',
    id: 'java-service-estoque',
    properties: [
      {
        writable: false,
        name: 'Owner',
        value: 'Squad de Estoque'
      },
      {
        writable: false,
        name: 'Technical debt',
        value: '5'
      },
      {
        writable: false,
        name: 'Code verage',
        value: '75%'
      }
    ]
  }
});

canvas.addShape(shape2, root);


var connection1 = elementFactory.createConnection({
  waypoints: [
    { x: 200, y: 130 },
    { x: 290, y: 220 }
  ],
  source: shape1,
  target: shape2
});

canvas.addConnection(connection1, root);


var shape3 = elementFactory.createShape({
  x: 450,
  y: 80,
  width: 100,
  height: 80,
  businessObject: {
    type: 'service',
    name: 'Clientes',
    id: 'java-service-clientes',
    properties: [
      {
        writable: false,
        name: 'Owner',
        value: 'Squad de Clientes'
      },
      {
        writable: false,
        name: 'Technical debt',
        value: '2'
      },
      {
        writable: false,
        name: 'Code verage',
        value: '56%'
      }
    ]
  }
});

canvas.addShape(shape3, root);

var shape4 = elementFactory.createShape({
  x: 425,
  y: 50,
  width: 300,
  height: 200,
  isFrame: true
});

canvas.addShape(shape4, root); 



// (3) interact with the diagram via API

const selection = diagram.get('selection');

selection.select(shape3);






