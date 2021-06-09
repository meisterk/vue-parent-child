<template>
  <div class="p-2">  
    <h1>CreateChild</h1>
    <label for="firstName">Firstname</label>  
    <input id="firstName" type="text" v-model="firstName" class="form-control">
    
    <label for="lastName">Lastname</label>
    <input id="lastName" type="text" v-model="lastName" class="form-control">
    
    <Size :sizeInCm="size" @sizeChanged="sizeChanged" />

    <div class="pt-2">
      <button @click="buttonCancel" class="btn btn-outline-secondary me-2">Cancel</button>
      <button @click="buttonSave" class="btn btn-success">Save</button>
    </div>
  </div>
</template>

<script>
import Size from "../components/Size.vue";
export default {
  components:{
    Size
  },
  data(){   
    return {
        firstName: "",
        lastName: "",
        size: 185
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
        size: this.size,
        parent: null        
      };
      this.$store.dispatch('addChild', newChild);
      this.$router.push('/');
    },
    sizeChanged(newValue){
      this.size = newValue;
    }
  }
}
</script>
