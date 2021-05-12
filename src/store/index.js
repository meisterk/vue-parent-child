import { createStore } from 'vuex';

export default createStore({
  state: {
    parents: {
      byId: {
        111: { id: 111, name: "Parent A"},
        222: { id: 222, name: "Parent B"},
        333: { id: 333, name: "Parent C"},
      },
      allIds: [111, 222, 333],
      selectedParentId: 222
    },

    children: {
      byId: {
        11: { id: 11, firstName: "Anna", lastName: "Arm", parent: 111},
        22: { id: 22, firstName: "Alf", lastName: "Alla", parent: 111},
        33: { id: 33, firstName: "Berta", lastName: "Bein", parent: 222},
        44: { id: 44, firstName: "Ben", lastName: "Bauch", parent: 222}
      },
      allIds: [11, 22, 33, 44]
    }
  },
  getters: {
    /************ PARENTS *********************************************/
    allParents: state => state.parents.allIds.map( id => state.parents.byId[id] ),
    // [{id: 111, name: "Parent A"}, ...]

    numberOfParents: state => {
      return state.parents.allIds.length;
    },

    parentExists: state => state.parents.allIds.length > 0,

    /************ CHILDREN *********************************************/
    numberOfChildren: state => {
      return state.children.allIds.length;
    },

    averageNumberOfChildren: state => {
      const childrenCount = state.children.allIds.length;
      const parentCount = state.parents.allIds.length;
      if(parentCount === 0){
        return '-';
      }
      else{
        return (childrenCount / parentCount).toFixed(1);
      }      
    },

    allChildren: state =>
      state.children.allIds
        .map( id => state.children.byId[id] ),

    childrenOfParentById: (state) => (parentId) => {
      return state.children.allIds
        .map( id => state.children.byId[id] )
        .filter( child => 
          child.parent === parentId);
    },    

    childrenOfSelectedParent: state =>
      state.children.allIds
        .map( id => state.children.byId[id] )
        .filter( child => 
          child.parent === state.parents.selectedParentId),
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
                byId: {
                  111: { id: 111, name: "Parent A"},
                  222: { id: 222, name: "Parent B"},
                  333: { id: 333, name: "Parent C"},
                },
                allIds: [111, 222, 333],
                selectedParentId: 222
              },
          
              children: {
                byId: {
                  11: { id: 11, firstName: "Anna", lastName: "Arm", parent: 111},
                  22: { id: 22, firstName: "Alf", lastName: "Alla", parent: 111},
                  33: { id: 33, firstName: "Berta", lastName: "Bein", parent: 222},
                  44: { id: 44, firstName: "Ben", lastName: "Bauch", parent: 222}
                },
                allIds: [11, 22, 33, 44]
              }
            }
          )
				);
      }
    },
    updateSelectedParentId(state, id){
      state.parents.selectedParentId = id;
    },
    addParent(state, newParent){
      const id = newParent.id;
      // add new property to object      
      state.parents.byId = { ...state.parents.byId, [id]: newParent };      
      state.parents.allIds.push(id);
      state.parents.selectedParentId = id;
    },   
    deleteParent(state, id){
      // 1. delete all children of selected parent 
      Object.values(state.children.byId).forEach(child => {
        if(child.parent === id){
          // a) children.byId
          const index = state.children.allIds.indexOf(child.id);          
          state.children.allIds.splice(index, 1);
          // b) children.allIds          
          delete state.children.byId.[child.id];
        }
      });           

      // 2. delete parent
      // a) parents.ById
      delete state.parents.byId.[id];
      // b) parents.allIds
      state.parents.allIds = state.parents.allIds.filter(function(value){ 
        return value !== id;
      });

      // 3. select other parent
      if(state.parents.allIds.length > 0){
        const nextId = state.parents.allIds[0];
        state.parents.selectedParentId = nextId;
      }else{
        state.parents.selectedParentId = null;
      }      
    },   
    addChild(state, newChild){
      const id = newChild.id;
      newChild.parent = state.parents.selectedParentId;
      state.children.byId = { ...state.children.byId, [id]: newChild };
      state.children.allIds.push(id);      
    },   
    deleteChild(state, id){            
      delete state.children.byId[id]; 
      state.children.allIds = state.children.allIds.filter(function(value){ 
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
      const parentId = state.parents.selectedParentId;
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
