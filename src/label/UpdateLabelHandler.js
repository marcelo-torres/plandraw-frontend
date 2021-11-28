// Extracted from https://github.com/bpmn-io/bpmn-js/

import {
    setLabel,
    getLabel
  } from './LabelUtil';

/**
 * A handler that updates the text of a BPMN element.
 */
export default function UpdateLabelHandler(modeling, textRenderer) {

    function setText(element, text) {

        // external label if present
        var label = element.label || element;
    
        var labelTarget = element.labelTarget || element;
        setLabel(label, text, labelTarget !== label);
        return [ label, labelTarget ];
    }

}


UpdateLabelHandler.$inject = [
    'modeling',
    'textRenderer'
];


  // helpers ///////////////////////

function isEmptyText(label) {
    return !label || !label.trim();
}