import PDRenderer from "./PDRenderer";
import Styles from 'diagram-js/lib/draw/Styles';
import TextRenderer from "../label/TextRenderer";

export default {
    __init__: [
      'pdrenderer'
    ],
    __depends__: [
      TextRenderer
    ],
    pdrenderer: [ 'type', PDRenderer ],
    styles: [ 'type', Styles ]
};

