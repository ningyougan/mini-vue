import { h } from "../../lib/mini-vue.esm.js";

export const App = {
  render() {
    return h("div", "hi Mini Vue" + this.msg);
  },
  setup() {
    // composition api
    return {
      msg: "Mini Vue",
    };
  },
};