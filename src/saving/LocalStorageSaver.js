
import { assign } from 'min-dash';

export default function LocalStorageSaver() {

  this.SUPPORTS_HTML5_STORAGE = supports_html5_storage();
  this.KEY = "myItem";
  this.JSONfn = {};

  // Check if it is supported in your browser
  function supports_html5_storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  this.stringify = function (obj) {
    return JSON.stringify(obj);
  }

  this.parse = function (str) {
    return JSON.parse(str);
  }

  /*const handlers = {
    'Root': function(element, canvas, elementFactory) {
      var root = elementFactory.createRoot();
      canvas.setRootElement(root);
    },

    'Shape': function(element, canvas, elementFactory, root) {
      var root = elementFactory.createRoot();
      canvas.setRootElement(root);
    },

    'Shape': function(element, canvas, elementFactory, root) {
      var root = elementFactory.createRoot();
      canvas.setRootElement(root);
    },
  }

  this.handle = function(elementType, element, canvas) {
    
  }*/
}

LocalStorageSaver.prototype.save = function save(canvas) {
  if (!this.SUPPORTS_HTML5_STORAGE) {
    console.error("There is no support fo HTML5 LocalStorage. It is not possible to save diagram.")
    return;
  }

  if (canvas == null && canvas._elementRegistry == null) {
    console.error("Canvas or canvas._elementRegistry cannot be null");
    return;
  }

  var allElements = canvas._elementRegistry.getAll();
  console.log(allElements);

  var elementsToSave = new Array();
  for (const element of allElements) {

    if (element.constructor.name == 'Connection') {
      var elementToSave = {
        type: element.constructor.name,
        data: element,
        connectionData: {
          sourceId: element.source.id,
          targetId: element.target.id
        }
      }
    } else {
      var elementToSave = {
        type: element.constructor.name,
        data: element
      }
    }

    elementsToSave.push(elementToSave);
    localStorage.setItem(this.KEY, this.stringify(elementsToSave))
  }
}


LocalStorageSaver.prototype.load = function load(diagram, canvas, elementFactory) {
  if (!this.SUPPORTS_HTML5_STORAGE) {
    console.error("There is no support fo HTML5 LocalStorage. It is not possible to save diagram.")
    return;
  }

  var retrivedElements = this.parse(localStorage.getItem(this.KEY));
  console.log(retrivedElements);

  diagram.clear();

  var root = elementFactory.createRoot();
  canvas.setRootElement(root);

  const createdShapes = {};

  for (const element of retrivedElements) {
    delete element.data.labels;
    delete element.data.children;

    element.data.id = adaptId(element.data.id);

    if (element.type == 'Shape') {
      var shape = elementFactory.createShape(element.data);
      canvas.addShape(shape, root);

      createdShapes[shape.id] = shape;
    }

    if (element.type == 'Connection') {
      element.data.source = createdShapes[adaptId(element.connectionData.sourceId)];
      element.data.target = createdShapes[adaptId(element.connectionData.targetId)];
      var connection = elementFactory.createConnection(element.data)

      var parentIndexConnection = 0;
      canvas.addConnection(connection, root, parentIndexConnection);
    }
  }

  function adaptId(id) {
    return 'loaded_' + id;
  }
}





