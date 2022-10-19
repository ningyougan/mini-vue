import { isObject } from "../shared";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // patch
  // processElement();
  patch(vnode, container);
}

function patch(vnode, container) {
  // 判断是否为 element
  if (typeof vnode.type === "string") {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type));

  const { children } = vnode;

  if (typeof children === "string") {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }
  const { props } = vnode;
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }

  container.append(el);
}
function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(initialVnode: any, container) {
  const instance = createComponentInstance(initialVnode);

  setupComponent(instance);
  setupRenderEffect(instance, initialVnode, container);
}

function setupRenderEffect(instance: any, initialVnode, container) {
  // Implement
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  // vnode -> patch
  // vnode -> element -> mountelement
  patch(subTree, container);
  initialVnode.el = subTree.el;
}
