import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// export const store = new Vuex.Store({
export default new Vuex.Store({
  state: {
    dices: [
      { icon: "mdi-dice-1", color: "red" },
      { icon: "mdi-dice-2", color: "blue" },
      { icon: "mdi-dice-3", color: "green" },
      { icon: "mdi-dice-4", color: "orange" },
      { icon: "mdi-dice-5", color: "purple" },
      { icon: "mdi-dice-6", color: "black" }
    ]
  },
  mutations: {},
  actions: {}
});
