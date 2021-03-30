<template>
  <h1>Home</h1>
  <h2>Parent</h2>
  <label for="parent-select">Parent: </label>
  <select v-model="selectedParent">
    <option v-for="parent in parents" v-bind:value="parent.id" v-bind:key="parent.id" id="parent-select">
      {{ parent.name }}
    </option>
  </select>
  <p>Selected: {{ selectedParent }}, Next Id: {{ nextId }}</p>

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
      return this.$store.state.parents;
    },
    children(){
      return this.$store.getters.children;
    },
    nextId(){
      return this.$store.getters.nextId;
    },
    selectedParent: {
      get () {
        return this.$store.state.selectedParent;
      },
      set (value) {
        this.$store.commit('selectParent', value);
      }
    }    
  }
}
</script>
