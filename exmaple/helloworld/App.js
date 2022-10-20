import { h } from "../../lib/mini-vue.esm.js";
import { Foo } from './Foo.js'

window.self = null
export const App = {
  render() {
    window.self = this
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
        onClick() {
          console.log('click');
        },
        onMousedown() {
          console.log('Mouse Down')
        }
      },
      [h('div', {}, 'hi,' + this.msg), h(Foo, {
        count: 1
      })]
      // "hi , mini-vue",
      // [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")]
      // this.$el -> get root element
      // 'hi ,' + this.msg
    );
  },
  setup() {
    // composition api
    return {
      msg: "Mini Vue",
    };
  },
};
