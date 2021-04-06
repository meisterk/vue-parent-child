<template>
<div class="modal-container">
    <div class="modal-content">
      <h2>Delete {{ typeOfElement }}</h2>
      <p>Do you really want to delete {{ nameOfElement }}?</p>
      <div>
        <button @click="cancel" class="btn btn-danger me-2">Cancel</button>
        <button @click="deleteOk" class="btn btn-primary">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeleteModal',
    props: { 
      typeOfElement: String,
      nameOfElement: String 
      },
    methods: {
      cancel() {
        this.$emit('close');
      },
      deleteOk(){
        this.$emit('deleteOk');
      }
    },
  };
</script>

<style>
  .modal-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background-color: #FFFFFF;
    color: black;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 1em;
  }
</style>