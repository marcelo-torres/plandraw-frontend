
import { assign } from 'min-dash';

export default function RemoteServerSaver() {
  this.KEY = "myItem";
  this.JSONfn = {};

  this.HOST = 'http://localhost:8081/';
  this.BASE_PATH = 'api/v1/plandraw/';
  this.URL_DIAGRAM = this.HOST + this.BASE_PATH + 'diagram/';

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

  //https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
  this._post = async (url, jsonBody) => {
    const response = await fetch(url, {
      method: 'POST',
      body: jsonBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response;
    if(responseData && responseData.status != 204) {
      return responseData.json();
    }
  }

  this._put = async (url, jsonBody) => {
    const response = await fetch(url, {
      method: 'PUT',
      body: jsonBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response;
    if(responseData && responseData.status != 204) {
      return responseData.json();
    }
  }

  this._get = async (url) => {
    const response = await fetch(url);
    console.log(response);
    const jsonResponse = await response.json(); 
    console.log(jsonResponse);
    return jsonResponse;
  }
}

RemoteServerSaver.prototype.create = async function(diagramName, canvas) {
  if (canvas == null && canvas._elementRegistry == null) {
    console.error("Canvas or canvas._elementRegistry cannot be null");
    return;
  }
  
  function buildDiagramModel(diagramName, diagramElements) {
    var diagramModel = {
      name: diagramName,
      elements: new Array()
    };
  
    for (const element of diagramElements) {
  
      var elementToSave = {
        type: element.constructor.name,
        data: element
      }
  
      if (element.constructor.name == 'Connection') {
          elementToSave['connectionData'] = {
            sourceId: element.source.id,
            targetId: element.target.id
          }
      }
  
      
      diagramModel.elements.push(elementToSave);
    }

    return diagramModel;
  }

  var allElements = canvas._elementRegistry.getAll();
  var diagramModel = buildDiagramModel(diagramName, allElements);
  
  var diagramJson = this.stringify(diagramModel);
  var url = this.URL_DIAGRAM;

  var response = await this._post(url, diagramJson);
  if(response && response.status === 'ok') return response.insertedId;
}

RemoteServerSaver.prototype.update = async function(diagramName, diagramId, canvas) {
  if (canvas == null && canvas._elementRegistry == null) {
    console.error("Canvas or canvas._elementRegistry cannot be null");
    return;
  }
  
  function buildDiagramModel(diagramName, diagramElements) {
    var diagramModel = {
      name: diagramName,
      elements: new Array()
    };
  
    for (const element of diagramElements) {
  
      var elementToSave = {
        type: element.constructor.name,
        data: element
      }
  
      if (element.constructor.name == 'Connection') {
          elementToSave['connectionData'] = {
            sourceId: element.source.id,
            targetId: element.target.id
          }
      }
  
      
      diagramModel.elements.push(elementToSave);
    }

    return diagramModel;
  }

  var allElements = canvas._elementRegistry.getAll();
  var diagramModel = buildDiagramModel(diagramName, allElements);
  
  var diagramJson = this.stringify(diagramModel);
  var url = this.URL_DIAGRAM + diagramId;

  var response = await this._put(url, diagramJson);
  if(response && response.status === 'ok') return response.insertedId;
}

RemoteServerSaver.prototype.load = async function(diagramId, diagram, canvas, elementFactory) {

  var url = this.URL_DIAGRAM + diagramId;
  const diagramModel = await this._get(url);
  console.log("From server", diagramModel);

  diagram.clear();

  var root = elementFactory.createRoot();
  canvas.setRootElement(root);

  const createdShapes = {};

  for (const element of diagramModel.elements) {
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

RemoteServerSaver.prototype.getDiagramIds = async function getDiagramIds() {
  const r = await this._get(this.URL_DIAGRAM);
  return r;
}





