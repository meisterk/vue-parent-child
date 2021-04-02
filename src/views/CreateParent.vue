<template>  
  <h1>CreateParent</h1>  
  <input type="text" v-model="parentName">
  <div>
    <button @click="buttonCancel">Cancel</button>
    <button @click="buttonSave">Save</button>
  </div>
</template>

<script>
export default {
  data(){   
    return {
        parentName: ""
    } 
  },
  methods:{
    buttonCancel(){      
      this.$router.push('/');
    },
    buttonSave(){
      const newId = this.$store.getters.newId;
      const newParent = {
        id: newId,
        name: this.parentName,
        children: []
      };
      this.$store.commit('addParent',newParent);
      this.$router.push('/');
    }
  }
}
</script>
