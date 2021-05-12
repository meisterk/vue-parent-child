<template>
  <div class="alert alert-warning">
    <h2 class="alert-heading">Info</h2> 
    <p>Anzahl der Eltern: {{ numberOfParents }}</p>          
    <p>Anzahl der Kinder: {{ numberOfChildren }}</p>          
    <p>Durchschnittliche Anzahl der Kinder: {{ averageNumberOfChildren }}</p>
  </div>         
</template>

<script>
export default {
  name: "Info",  
  computed :{
    numberOfParents(){        
        return  this.$store.getters.numberOfParents;  
    },
    numberOfChildren(){        
        return  this.$store.getters.numberOfChildren;       
    },
    averageNumberOfChildren(){
        return this.$store.getters.averageNumberOfChildren;
    }
  }
};
</script>

<style scoped>

</style>