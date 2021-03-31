<template>
  <h1>Home</h1>
  <h2>Parent</h2>
  <label for="parent-select">Parent: </label>
  <select v-model="selected">
    <option v-for="parent in parents" v-bind:value="selected" v-bind:key="parent.id" id="parent-select">
      {{ parent.name }}
    </option>
  </select>
  <p>Selected: {{ selected }}</p>

  <h2>Children</h2>
  <ul>
    <li v-for="child in children" v-bind:key="child.id">
      {{ child.name }} {{ child.id }}
    </li>
  </ul>
</template>

<script>
export default {
  data(){   
    return {
      selected: 2
    } 
  },
  computed: {
    parents(){
      return this.$store.getters.parentSet;
    },
    children(){
      return this.$store.getters.childrenSet(2);
    },
    selectedParent(){
      return this.$store.state.selectedParent;
    }
  }
}
</script>
