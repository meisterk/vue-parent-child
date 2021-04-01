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
      selectedParentId: 333
    } 
  },
  computed: {
    parents(){
      return this.$store.getters.parentSet;
    },
    children(){
      //const selectParentId = 111;
      const allChildren = this.$store.getters.childrenSet;
      return allChildren.filter(child => child.parent === this.$data.selectedParentId);
    },
    selectedParent(){
      return this.$store.state.selectedParent;
    }
  }
}
</script>
