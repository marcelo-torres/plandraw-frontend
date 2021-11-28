
function updateDiagram(saver, canvas) {
    var diagramBreadCrumbName = document.getElementById('diagram-breadcrumb-name');
    var diagramName = diagramBreadCrumbName.innerText;
    var diagramId = diagramBreadCrumbName.getAttribute('diagramId');

    if(diagramId) {
        saver.update(diagramName, diagramId, canvas);
    } else {
        console.log('no diagram id')
        // if there is no Id then it is not an update, but a create operation
        var saveButton = document.getElementById('new-diagram-buttom');
        saveButton.click();
    }
}

function updateDiagramBreadCrumbName(diagramName, diagramId) {
    var diagramBreadCrumbName = document.getElementById('diagram-breadcrumb-name');
    diagramBreadCrumbName.innerText = diagramName;
    diagramBreadCrumbName.setAttribute('diagramId', diagramId);
}

function loadDiagram(diagramName, saver, id, diagram, canvas, elementFactory) {
    saver.load(id, diagram, canvas, elementFactory);
    updateDiagramBreadCrumbName(diagramName, id);
}

function loadModal() {
    saver.getDiagramIds()
        .then(d => createButtons(d))
    
    var modal = document.getElementById("modal-manage-diagrams");  
    UIkit.modal(modal).show();
}

function createButtons(ids) {
    clearContainer();

    var container = document.getElementById("modal-manage-diagrams-button-container");  

    var grid = null;

    const cardsPerLine = 2;
    var count = 0;
    for(const d of ids) {

        if(count % cardsPerLine == 0) {
            grid = createButtonGrid();
            container.appendChild(grid);
        }

        var button = createButton(d._id, d.name);
        grid.appendChild(button);

        count++;
    }
}

function clearContainer() {
    var container = document.getElementById("modal-manage-diagrams-button-container");
    while (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }
}

function createButtonGrid() {
    var divGrid = document.createElement("div");
    divGrid.setAttribute("uk-grid", "");
    divGrid.className = "uk-grid-small uk-child-width-expand@s uk-text-center";

    return divGrid;
}

function createButton(id, name) {
    var div = document.createElement("div");

    var divButton = document.createElement("div");
    divButton.setAttribute("onclick", `loadDiagram('${name}', saver, '${id}', diagram, canvas, elementFactory)`);
    divButton.className = "uk-card uk-card-default uk-card-body uk-button uk-modal-close uk-card-hover uk-text-break";
    divButton.innerText = name;
    div.appendChild(divButton);

    return div;
}