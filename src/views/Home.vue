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

  <h2>Children</h2>
  <ul>
    <li v-for="child in children" v-bind:key="child.id">
      {{ child.id }} {{ child.name }} 
    </li>
  </ul>
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
