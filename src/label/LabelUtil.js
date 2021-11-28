

function getLabelAttr(semantic) {

  if(semantic && semantic.type && semantic.type === 'service') {
    return 'name';
  }

  /*if (
    is(semantic, 'bpmn:FlowElement') ||
    is(semantic, 'bpmn:Participant') ||
    is(semantic, 'bpmn:Lane') ||
    is(semantic, 'bpmn:SequenceFlow') ||
    is(semantic, 'bpmn:MessageFlow') ||
    is(semantic, 'bpmn:DataInput') ||
    is(semantic, 'bpmn:DataOutput')
  ) {
    return 'name';
  }

  if (is(semantic, 'bpmn:TextAnnotation')) {
    return 'text';
  }

  if (is(semantic, 'bpmn:Group')) {
    return 'categoryValueRef';
  }*/
  return '';
}

function getCategoryValue(semantic) {
  var categoryValueRef = semantic['categoryValueRef'];

  if (!categoryValueRef) {
    return '';
  }


  return categoryValueRef.value || '';
}

export function getLabel(element) {

  var semantic = element.businessObject,
      attr = getLabelAttr(semantic);

  if (attr) {
    return semantic[attr] || '';
  }
}


export function setLabel(element, text, isExternal) {
  var semantic = element.businessObject,
      attr = getLabelAttr(semantic);

  if (attr) {
    semantic[attr] = text;
  }

  return element;
}