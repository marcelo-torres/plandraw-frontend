/**
 * A example context pad provider.
 */
export default function ExampleContextPadProvider(connect, contextPad, modeling, menuLoader) {
  this._connect = connect;
  this._modeling = modeling;
  this._menuLoader = menuLoader;

  contextPad.registerProvider(this);
}

ExampleContextPadProvider.$inject = [
  'connect',
  'contextPad',
  'modeling',
  'menuLoader',
];


ExampleContextPadProvider.prototype.getContextPadEntries = function(element) {
  var connect = this._connect,
      modeling = this._modeling,
      menuLoader = this._menuLoader;

  function removeElement() {
    modeling.removeElements([ element ]);
  }

  function startConnect(event, element, autoActivate) {
    connect.start(event, element, autoActivate);
  }

  function openMenu() {
    menuLoader.openMenu(element);
  }

  return {
    'delete': {
      group: 'edit',
      className: 'context-pad-icon-remove',
      title: 'Remove',
      action: {
        click: removeElement,
        dragstart: removeElement
      }
    },
    'connect': {
      group: 'edit',
      className: 'context-pad-icon-connect',
      title: 'Connect',
      action: {
        click: startConnect,
        dragstart: startConnect
      }
    },
    'menu': {
      group: 'edit',
      className: 'context-pad-icon-menu',
      title: 'Menu',
      action: {
        click: openMenu,
        dragstart: openMenu
      }
    }
  };
};