import LocalStorageSaver from './LocalStorageSaver';
import RemoteServerSaver from './RemoteServerSaver';

export default {
  __init__: [ 'saver' ],
  //saver: [ 'type', LocalStorageSaver ]
  saver: [ 'type', RemoteServerSaver ]
};