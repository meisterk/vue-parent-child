<template>
  <h2>Joke of the day</h2> 
    <p>{{ jokes[randomIndex] }}</p>
    <router-link to="/">Home</router-link>
</template>

<script>
export default {
  name: "Joke",
  data(){
    return {
      jokes: [
        "Programmer: A machine that turns coffee into code.",
        "Programmer: A person who fixed a problem that you don't know you have, in a way you don't understand.",
        "Algorithm: Word used by programmers when they do not want to explain what they did."
      ],
      randomIndex: 0
    }
  },
  methods: {
    shuffle(){
      this.randomIndex = Math.floor(Math.random() * 3);
    }
  },
  mounted(){
    this.shuffle();    
  }  
};
</script>

<style scoped>

</style>