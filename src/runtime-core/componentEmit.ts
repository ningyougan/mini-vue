import { camelize, toHandlerKey } from "../shared";

export function emit(instance, event, ...args) {
  console.log("emit", event);

  // instance.props -> event
  const { props } = instance;

  // add -> Add
  // add-foo -> addFoo
  const handlerName = toHandlerKey(camelize(event) as any);
  const handler = props[handlerName];
  handler && handler(...args);
}
