<template>
  <h1>Home</h1>
  
  <label for="parents">Parent: </label>

  <select v-model="selected">
  <option v-for="parent in parents" v-bind:value="parent.id" v-bind:key="parent.id" id="parents">
    {{ parent.name }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
</template>

<script>
export default {
  data(){
    return {
      selected: 2,
      parents: [
        { id: 1, name: "Parent A"},
        { id: 2, name: "Parent B"},
        { id: 3, name: "Parent C"},
      ]
    }
  }
}
</script>
