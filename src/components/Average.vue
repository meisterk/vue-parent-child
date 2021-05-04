<template>  
    <p>Anzahl der Eltern: {{ numberOfParents }}</p>          
    <p>Anzahl der Kinder: {{ numberOfChildren }}</p>          
    <p>Durchschnittliche Anzahl der Kinder: {{ averageNumberOfChildren }}</p>          
</template>

<script>
export default {
  name: "Average",  
  computed :{
    numberOfParents(){        
        return  this.$store.getters.numberOfParents;  
    },
    numberOfChildren(){        
        return  this.$store.getters.numberOfChildren;       
    },
    averageNumberOfChildren(){
        return (this.numberOfChildren / this.numberOfParents).toFixed(1);
    }
  }
};
</script>

<style scoped>
p {
  background-color: yellow;
  color: black;
  padding: 0.2em 0.5em;
  margin-top: 0.2em;
}
</style>