<template>
  <label for="size">Size</label>
  <select id="size" v-model="size" class="form-control">
    <option value="150">150 cm</option>
    <option value="170">170 cm</option>
    <option value="185">185 cm</option>
  </select>  
</template>

<script>
  export default {
    name: 'Size',
    props: { 
      sizeInCm: Number
    },
    data(){
      return {
        size: this.sizeInCm
      }
    },
    watch: {
      size(newValue){
          console.log(newValue);
          this.$emit('sizeChanged', newValue);
      }
    }
  };
</script>

<style>
  
</style>