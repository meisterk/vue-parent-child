<template>
  <div class="p-2">  
    <h1>CreateChild</h1>  
    <input type="text" v-model="childName" class="form-control">
    <div class="pt-2">
      <button @click="buttonCancel" class="btn btn-danger me-2">Cancel</button>
      <button @click="buttonSave" class="btn btn-primary">Save</button>
    </div>
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
      const newChild = {
        id: null, // new id is calculated in store
        name: this.childName,
        parent: null        
      };
      this.$store.dispatch('addChild',newChild);
      this.$router.push('/');
    }
  }
}
</script>
