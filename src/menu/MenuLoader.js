export default function MenuLoader(eventBus) {
    this._eventBus = eventBus;

    this.diagramElementOnContext;
    this.PROPERTIES_MAP = {
        componentName: 'menu-component-name',
        componentId: 'menu-component-id',
    };

    var menuLoader = this;
    UIkit.util.on('#offcanvas-reveal', 'hidden', function () {
        menuLoader.saveData(menuLoader.diagramElementOnContext);
        menuLoader.clearMenu();
        menuLoader.diagramElementOnContext = null;
    });

    var componentName = this.getElement('componentName');
    UIkit.util.on('#menu-component-name', 'keyup', function () {
        var e = menuLoader.getElementOnContext();
        eventBus.fire('element.label.changed', { element: e, newLabel: componentName.value})
    });
}


MenuLoader.prototype.getElementOnContext = function() {
    return this.diagramElementOnContext;
}

MenuLoader.prototype.getElement = function(componentProperty) {
    var htmlId = this.PROPERTIES_MAP[componentProperty];
    var htmlElement = document.getElementById(htmlId);
    return htmlElement;
}

MenuLoader.prototype.openMenu = function (element) {
    if(!element.businessObject) return;
    
    this.diagramElementOnContext = element;
    fillMainFields(element, this);
    fillVariableFields(element, this);

    var offcanvas = document.getElementById("offcanvas-reveal");
    UIkit.offcanvas(offcanvas).show();

    function fillMainFields(element, elementGetter) {
        if(!element.businessObject.name || !element.businessObject.id) {
            console.warn('The element does not have name or id attributes');
            //return;
        }
        var componentName = elementGetter.getElement('componentName');
        componentName.value = element.businessObject.name || '';

        var componentId = elementGetter.getElement('componentId');
        componentId.value = element.businessObject.id || '';
    }

    function fillVariableFields(element, elementGetter) {
        var properties = element.businessObject.properties;
        if(!properties) return;

        var htmlPropertiesList = document.getElementById('properties-list');

        for(const property of properties) {

            var propertyName = property.name;
            var inputId = 'input-'+property.name;
            var inputValue = property.value;
            var labelId = 'input-label-'+property.name;
            var labelValue = property.name;

            if(property.writable)
                var newElement = createWritableFieldHtmlElement(propertyName, inputId, inputValue, labelId, labelValue);
            else
                var newElement = createNonWritableFieldHtmlElement(propertyName, inputId, inputValue, labelId, labelValue);

            htmlPropertiesList.appendChild(newElement);
        }
    }

    function createNonWritableFieldHtmlElement(propertyName, textId, textValue, labelId, labelValue) {

        var label = document.createElement("label");
        label.className = "uk-form-label uk-text-bold";
        label.setAttribute("id", labelId);
        label.setAttribute("for", textId);
        label.innerText = labelValue;

        var p = document.createElement("p");
        p.setAttribute("id", textId);
        p.setAttribute("style", "padding-left: 8px; margin: 0px;");
        if(textValue != undefined && textValue != '') {
            p.innerText = textValue;
        } else {
            p.classList.add("uk-text-muted");
            p.classList.add("uk-text-italic");
            p.innerText = 'Empty';
        }
        
        var divMargin = document.createElement("div");
        divMargin.setAttribute("id", propertyName);
        divMargin.className = "uk-margin-small";
        divMargin.appendChild(label);
        divMargin.appendChild(p);
        
        return divMargin;
    }

    function createWritableFieldHtmlElement(propertyName, inputId, inputValue, labelId, labelValue) {
        var input = document.createElement("input");
        input.className = "uk-input uk-form-small uk-form-blank";
        input.setAttribute("id", inputId);
        input.setAttribute("type", 'text');
        input.setAttribute("placeholder", "Enter property");
        input.value = inputValue;

        var span = document.createElement("span");
        span.className = "uk-form-icon uk-form-icon-flip";
        span.setAttribute("uk-icon", "pencil");

        var divInline = document.createElement("div");
        divInline.className = "uk-inline uk-width-1-1";
        divInline.appendChild(input);
        divInline.appendChild(span);

        var label = document.createElement("label");
        label.className = "uk-form-label uk-text-bold";
        label.setAttribute("id", labelId);
        label.setAttribute("for", inputId);
        label.innerText = labelValue;

        var divForm = document.createElement("div");
        divForm.className = "uk-form-controls";
        divForm.appendChild(divInline);

        var divMargin = document.createElement("div");
        divMargin.setAttribute("id", propertyName);
        divMargin.className = "uk-margin-small";
        divMargin.appendChild(label);
        divMargin.appendChild(divForm);

        return divMargin;
    }

    

    
}

MenuLoader.prototype.saveData = function(element) {
    if(!element || !element.businessObject) return;

    console.log("saving menu data to element: ", element);

    saveMainFields(element, this);
    saveVariableFields(element, this);

    function saveMainFields(element, elementGetter) {
        var componentName = elementGetter.getElement('componentName');
        element.businessObject.name = componentName.value;
        var componentId = elementGetter.getElement('componentId');
        element.businessObject.id = componentId.value;
    }

    function saveVariableFields(element, elementGetter) {
        var properties = element.businessObject.properties;
        if(!properties) return;

        for(const property of properties) {
            if(!property.writable) continue;

            var inputId = 'input-'+property.name;
            var input = document.getElementById(inputId);      
            property.value = input.value;
            console.log(input.value);

            console.log(input, input.value);
        }
    }
}

MenuLoader.prototype.clearMenu = function() {
  
    clearVariableFields();

    function clearVariableFields() {
        const myNode = document.getElementById("properties-list");
        while (myNode.lastElementChild) {
            myNode.removeChild(myNode.lastElementChild);
        }
    }
}



MenuLoader.$inject = ['eventBus']