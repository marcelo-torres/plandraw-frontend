const base_url = 'http://localhost:8081/';

async function getDiagrams() {
    const response =  await fetch(base_url + 'api/v1/plandraw/diagram/');
    return response.json();
}

function createOptionElement(text, value) {
    var option = document.createElement("option");
    option.setAttribute("value", value);
    option.innerText = text;

    return option;
}

async function updateSelectDiagram() {
    var selectDiagram = document.getElementById("select-diagram");    
    selectDiagram.innerHTML = '';//createOptionElement('Selecione', null);

    var diagrams = await getDiagrams();
    
    for(const diagram of diagrams) {
        var option = document.createElement("option");
        option.setAttribute("value", diagram._id);
        option.innerText = diagram.name;

        selectDiagram.appendChild(option);
    }

    updateSelectService(selectDiagram);
}

async function getService(diagramId) {
    const response =  await fetch(base_url + `api/v1/plandraw/diagram/${diagramId}/services`);
    console.log(response);
    return response.json();
}

async function updateSelectService(selectDiagram) {
    var selectService = document.getElementById("select-service");    
    selectService.innerHTML = '';//createOptionElement('Selecione', null);

    console.log(selectDiagram)
    var diagramId = selectDiagram.value;

    
    if(!diagramId) return;

    var diagrams = await getService(diagramId);
    
    for(const diagram of diagrams) {
        var option = document.createElement("option");
        option.setAttribute("value", diagram.id);
        option.innerText = diagram.name;

        selectService.appendChild(option);
    }
}


async function sendDataToBackend(writable, name, value) {
      
    var selectDiagram = document.getElementById("select-diagram");
    var diagramId = selectDiagram.value;

    var selectService = document.getElementById("select-service");
    var businessId = selectService.value; 

    var property = {
        writable: true,
        name: name,
        value: value
    }

    const options = {
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ property })
    }

    return fetch(base_url + `api/v1/plandraw/diagram/${diagramId}/element/${businessId}/property`, options)
}

function send() {
    var nameInput = document.getElementById("name");
    var valueInput = document.getElementById("value");
    var preloader = document.getElementById("preloader");

    if(!nameInput.value) {
        UIkit.notification({message: 'O nome da propriedade não pode ser nulo', status: 'warning', pos: 'bottom-left'});
        return;
    }

    preloader.hidden = false;
    sendDataToBackend(true, nameInput.value, valueInput.value)
    .then(response => {
        console.log(response);
        preloader.hidden = true;
        if(response.status == 204) {
            UIkit.notification({message: 'Propriedade criada/alterada com sucesso', status: 'success', pos: 'bottom-left'});
        } else {
            UIkit.notification({message: 'Ops, alguma coisa deu errada', status: 'danger', pos: 'bottom-left'});
        }
    })
    .catch(function(e) {
        console.log(e); // "Ah, não!"
        preloader.hidden = true;
        UIkit.notification({message: 'O valor ', status: 'danger', pos: 'bottom-left'});
    });
}