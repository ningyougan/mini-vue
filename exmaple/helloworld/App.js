import { h } from "../../lib/mini-vue.esm.js";

window.self = null
export const App = {
  render() {
    window.self = this
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      // "hi , mini-vue",
      // [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")]
      // this.$el -> get root element
      'hi ,' + this.msg
    );
  },
  setup() {
    // composition api
    return {
      msg: "Mini Vue",
    };
  },
};
