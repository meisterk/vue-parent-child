<template>
  <div class="p-2">  
    <h1>CreateChild</h1>
    <label for="firstName">Firstname</label>  
    <input id="firstName" type="text" v-model="firstName" class="form-control">
    
    <label for="lastName">Lastname</label>
    <input id="lastName" type="text" v-model="lastName" class="form-control">
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
        firstName: "",
        lastName: ""
    } 
  },
  methods:{
    buttonCancel(){      
      this.$router.push('/');
    },
    buttonSave(){            
      const newChild = {
        id: null, // new id is calculated in store
        firstName: this.firstName,
        lastName: this.lastName,
        parent: null        
      };
      this.$store.dispatch('addChild',newChild);
      this.$router.push('/');
    }
  }
}
</script>
