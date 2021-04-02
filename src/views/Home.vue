<template>
  <h1>Home</h1>
  <h2>Parent</h2>
  <label for="parent-select">Parent: </label>
  <select v-model="selectedParentId">
    <option v-for="parent in parents" v-bind:value="parent.id" v-bind:key="parent.id" id="parent-select">
      {{ parent.id }} {{ parent.name }}
    </option>
  </select>
  <p>selectedParentId: {{ selectedParentId }}</p>
  <button @click="newParent">Create new parent</button>

  <h2>Children</h2>
  <ul>
    <li v-for="child in children" v-bind:key="child.id">
      {{ child.id }} {{ child.name }} 
    </li>
  </ul>
  <button @click="newChild">Create new child</button>
</template>

<script>
export default {
  data(){   
    return {
      selectedParentId: 111
    }
  },
  computed: {    
    parents(){
      return this.$store.getters.parentSet;
    },
    children(){
      return this.$store.getters.childrenSet
        .filter(child => 
          child.parent === this.$data.selectedParentId
        );
    }    
  },
  methods:{
    newParent(){
      this.$router.push('/create-parent');
    },
    newChild(){
      this.$router.push('/create-child');
    }
  },
  mounted(){
    // store -> local data
    this.$data.selectedParentId = this.$store.state.selectedParentId;
  },
  watch: {
    // local data -> store
    selectedParentId: function(){
      this.$store.commit('setSelectedParentId', this.$data.selectedParentId);
    }
  }
}
</script>
