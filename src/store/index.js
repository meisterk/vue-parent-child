import { createStore } from 'vuex';

export default createStore({
  state: {
    parents: {
      111: { id: 111, name: "Parent A"},
      222: { id: 222, name: "Parent B"},
      333: { id: 333, name: "Parent C"},
    },
    parentsById: [111, 222, 333],
    selectedParentId: 222,

    children: {
      11: { id: 11, name: "Anna", parent: 111},
      22: { id: 22, name: "Berta", parent: 111},
      33: { id: 33, name: "Carla", parent: 222},
      44: { id: 44, name: "Dieter", parent: 222}
    },
    childrenById: [11, 22, 33, 44]
  },
  getters: {
    parentSet: state => state.parentsById.map( id => state.parents[id] ),
    childrenSet: state => state.childrenById.map( id => state.children[id] ),
    newId(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }                 
  },
  mutations: { 
    setSelectedParentId(state, id){
      state.selectedParentId = id;
    },
    addParent(state, newParent){
      const id = newParent.id;
      // add new property to object      
      state.parents = { ...state.parents, [id]: newParent };      
      state.parentsById.push(id);
      state.selectedParentId = id;
    },   
    addChild(state, newChild){
      const id = newChild.id;
      newChild.parent = state.selectedParentId;
      state.children = { ...state.children, [id]: newChild };
      state.childrenById.push(id);      
    },   
    deleteChild(state, id){            
      delete state.children.[id]; 
      state.childrenById = state.childrenById.filter(function(value){ 
        return value !== id;
      });     
    }   
  },
  actions: {
  },
  modules: {
  }
})
