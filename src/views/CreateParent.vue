<template>  
  <h1>CreateParent</h1>  
  <input type="text" v-model="parentName">
  <button @click="buttonSave">Save</button>
</template>

<script>
export default {
  data(){   
    return {
        parentName: ""
    } 
  },
  methods:{
    buttonSave(){
      const newParent = {
        id: this.$store.getters.nextId,
        name: this.parentName
      };
      this.$store.commit('addParent',newParent);
      this.$router.push('/');
    }
  }
}
</script>
