import { createStore } from 'vuex'

export default createStore({
  state: {
    parents: [
      { id: 1, name: "Parent A"},
      { id: 2, name: "Parent B"},
      { id: 3, name: "Parent C"},
    ],
    selectedParent: 3
  },
  getters: {    
    nextId: state => {
      const length = state.parents.length;
      const result = state.parents[length-1].id + 1;
      return result;
    }  
  },
  mutations: {
    selectParent(state, id){
      state.selectedParent = id;
    }
  },
  actions: {
  },
  modules: {
  }
})
