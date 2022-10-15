import { hasChange, isObject } from "../shared";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

// proxy -> object
// {} -> value get set

class RefImpl {
  private _value: any;
  public dep;
  public __v_isRef = true;
  private _rawValue: any;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    // value -> reactive
    // 1. 看value是否是对象

    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    // 一定是先去修改了value
    if (hasChange(this._rawValue, newValue)) {
      this._value = convert(newValue);
      this._rawValue = newValue;
      triggerEffect(this.dep);
    }
  }
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep);
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  // 看看是不是ref -> ref.value
  return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key));
    },

    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return Reflect.set(target, key, value);
      }
    },
  });
}
