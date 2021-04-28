<template>  
    <p>Durchschnittliche Anzahl der Kinder: {{ averageNumberOfChilderen }}</p>          
</template>

<script>
export default {
  name: "Average",
  data(){
      return {
          //averageNumberOfChilderen: 2.3
      }
  },
  computed :{
      averageNumberOfChilderen(){
        const allChildren = this.$store.state.children;
        const childrenById = this.$store.state.childrenById;
        const parentsById =  this.$store.state.parentsById;
        const numberOfParents = parentsById.length;
        let numberOfAllChildren = 0;
        parentsById.forEach(parentId => {
            const number = childrenById
            .map( id => allChildren[id] )
            .filter( child => child.parent === parentId)
            .length;
            numberOfAllChildren += number;
        });
        const averageNumber = (numberOfAllChildren / numberOfParents).toFixed(1);
        return averageNumber;
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