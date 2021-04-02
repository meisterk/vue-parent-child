<template>  
  <h1>CreateChild</h1>  
  <input type="text" v-model="childName">
  <div>
    <button @click="buttonCancel">Cancel</button>
    <button @click="buttonSave">Save</button>
  </div>
</template>

<script>
export default {
  data(){   
    return {
        childName: ""
    } 
  },
  methods:{
    buttonCancel(){      
      this.$router.push('/');
    },
    buttonSave(){
      const newId = this.$store.getters.newId;      
      const newChild = {
        id: newId,
        name: this.childName,
        parent: null        
      };
      this.$store.commit('addChild',newChild);
      this.$router.push('/');
    }
  }
}
</script>
