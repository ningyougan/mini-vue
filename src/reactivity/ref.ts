import { hasChange, isObject } from "../shared";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

// proxy -> object
// {} -> value get set

class RefImpl {
  private _value: any;
  public dep;
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
