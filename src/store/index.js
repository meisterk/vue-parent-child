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
      let maximum = -1;
      state.parents.forEach(parent => {
        if(parent.id > maximum){
          maximum = parent.id;
        }
      });
      return maximum + 1;      
    }  
  },
  mutations: {
    selectParent(state, id){
      state.selectedParent = id;
    },
    addParent(state, newParent){
      state.parents.push(newParent);
    }
  },
  actions: {
  },
  modules: {
  }
})
