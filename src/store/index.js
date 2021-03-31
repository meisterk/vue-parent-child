import { createStore } from 'vuex'

export default createStore({
  state: {
    parents: {
      1: { name: "Parent A", children: [1,2]},
      2: { name: "Parent B", children: [3,4]},
      3: { name: "Parent C"}
    },
    parentsById: [1,2,3],
    selectedParent: 2,
    children: {
      1: { name: "Anna", parent: 1},
      2: { name: "Berta", parent: 1},
      3: { name: "Carla", parent: 2},
      4: { name: "Dieter", parent: 2}
    },
    childrenById: [1,2,3,4]
  },
  getters: {
    parentSet: state => state.parentsById.map( id => state.parents[id] ),

    childrenSet: state => parentId =>
       state.childrenById
            .map( id => state.children[id] )
            .filter(child => child.parent === parentId)      
  },
  mutations: {    
  },
  actions: {
  },
  modules: {
  }
})
