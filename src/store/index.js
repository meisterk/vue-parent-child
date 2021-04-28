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
      22: { id: 22, name: "Alf", parent: 111},
      33: { id: 33, name: "Berta", parent: 222},
      44: { id: 44, name: "Ben", parent: 222}
    },
    childrenById: [11, 22, 33, 44]
  },
  getters: {
    parentSet: state => state.parentsById.map( id => state.parents[id] ),
    // [{id: 111, name: "Parent A"}, ...]

    numberOfParents: state => {
      return state.parentsById.length;
    },

    parentExists: state => state.parentsById.length > 0,

    numberOfChildren: state => {
      return state.childrenById.length;
    },

    childrenOfSelectedParent: state =>
      state.childrenById
        .map( id => state.children[id] )
        .filter( child => 
          child.parent === state.selectedParentId),
    // [{"id": 33, "name": "Berta", "parent": 222}, ... ]     
    
    newId(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    // e.g. c43c75a6-ef4e-4bac-9649-e6172347d00a 
  },
  mutations: {
    initializeStore(state){      
      if(localStorage.getItem('vue-parent-child')){
        let dataString = localStorage.getItem('vue-parent-child');
        this.replaceState(
					Object.assign(state, JSON.parse(dataString))
				);
      }else{
        this.replaceState(
					Object.assign(state, 
            {
              parents: {
                111: { id: 111, name: "Parent A"},
                222: { id: 222, name: "Parent B"},
                333: { id: 333, name: "Parent C"},
              },
              parentsById: [111, 222, 333],
              selectedParentId: 222,
          
              children: {
                11: { id: 11, name: "Anna", parent: 111},
                22: { id: 22, name: "Alf", parent: 111},
                33: { id: 33, name: "Berta", parent: 222},
                44: { id: 44, name: "Ben", parent: 222}
              },
              childrenById: [11, 22, 33, 44]
            }
          )
				);
      }
    },
    updateSelectedParentId(state, id){
      state.selectedParentId = id;
    },
    addParent(state, newParent){
      const id = newParent.id;
      // add new property to object      
      state.parents = { ...state.parents, [id]: newParent };      
      state.parentsById.push(id);
      state.selectedParentId = id;
    },   
    deleteParent(state, id){
      // 1. delete all children of selected parent 
      Object.values(state.children).forEach(child => {
        if(child.parent === id){
          // a) childrenById
          const index = state.childrenById.indexOf(child.id);          
          state.childrenById.splice(index, 1);
          // b) children          
          delete state.children.[child.id];
        }
      });           

      // 2. delete parent
      // a) parents
      delete state.parents.[id];
      // b) parentsById
      state.parentsById = state.parentsById.filter(function(value){ 
        return value !== id;
      });

      // 3. select other parent
      if(state.parentsById.length > 0){
        const nextId = state.parentsById[0];
        state.selectedParentId = nextId;
      }else{
        state.selectedParentId = null;
      }      
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
    updateSelectedParentId({commit, dispatch}, id){
      commit('updateSelectedParentId', id);
      dispatch('saveToLocalStorage');
    },
    addParent({commit, dispatch}, newParent){
      commit('addParent', newParent);
      dispatch('saveToLocalStorage');
    },
    deleteSelectedParent({commit, dispatch, state}){
      const parentId = state.selectedParentId;
      commit('deleteParent', parentId);
      dispatch('saveToLocalStorage');
    },
    addChild({commit, dispatch, getters}, newChild){
      const newId = getters.newId;
      newChild.id = newId;      
      commit('addChild', newChild);
      dispatch('saveToLocalStorage');
    },
    deleteChild({commit, dispatch}, id){
      commit('deleteChild', id);
      dispatch('saveToLocalStorage');
    },
    saveToLocalStorage({state}){
      const dataString = JSON.stringify(state);
      localStorage.setItem('vue-parent-child', dataString);
    }
  },
  modules: {
  }
})
