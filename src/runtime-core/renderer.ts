import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // patch
  // processElement();
  patch(vnode, container);
}

function patch(vnode, container) {
  // 判断是否为 element
  processComponent(vnode, container);
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
  // Implement
  const subTree = instance.render();

  // vnode -> patch
  // vnode -> element -> mountelement
  patch(subTree, container);
}