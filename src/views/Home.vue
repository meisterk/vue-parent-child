<template>
  <h1>Home</h1>
  
  <label for="parent-select">Parent: </label>

  <select v-model="selectedParent">
    <option v-for="parent in parents" v-bind:value="parent.id" v-bind:key="parent.id" id="parent-select">
      {{ parent.name }}
    </option>
  </select>
  <p>Selected: {{ selectedParent }}</p>
  <p>Next Id: {{ nextId }}</p>
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
