export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  };
  return component;
}

export function setupComponent(instance) {
  // initProps();
  // initSlots();

  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  // Implement
  const Component = instance.type;

  const { setup } = Component;

  if (setup) {
    // function Object
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult: any) {
  // function Object
  // TODO function

  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  // Implement
  const Component = instance.type;

  instance.render = Component.render;
  if (Component.render) {
  }
}
