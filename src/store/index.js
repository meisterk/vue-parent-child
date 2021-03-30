import { createStore } from 'vuex'

export default createStore({
  state: {
    parents: [
      { id: 1, name: "Parent A", children: [ { id: 1, name: "Anna"},{ id: 2, name: "Berta"}]},
      { id: 2, name: "Parent B", children: []},
      { id: 3, name: "Parent C", children: []},
    ],
    selectedParent: 3
  },
  getters: {    
    nextId: state => {      
      let maximum = -1;
      state.parents.forEach(parent => {
        if(parent.id > maximum){
          maximum = parent.id;
        }
      });
      return maximum + 1;      
    },
    parentIndex: state => {
      for (let index = 0; index < state.parents.length; index++) {
        const parent = state.parents[index];
        if(parent.id === state.selectedParent){
          return index;
        }
      }
      return -1;      
    },
    children: (state, getters) => {
      const i = getters.parentIndex;
      return state.parents[i].children;
    } 
  },
  mutations: {
    selectParent(state, id){
      state.selectedParent = id;
    },
    addParent(state, newParent){
      state.parents.push(newParent);
    },
    addChild(state, getters, newChild){
      const i = getters.parentIndex;
      console.log(i);
      state.parents[0].children.push(newChild);
    }
  },
  actions: {
  },
  modules: {
  }
})
