<template>
<div class="modal-backdrop">
    <div class="modal">
      <h2>Delete Child</h2>
      <p>Really?</p>
      <div>
        <button @click="cancel">Cancel</button>
        <button @click="deleteChild">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeleteModal',
    methods: {
      cancel() {
        this.$emit('close');
      },
      deleteChild(){
        this.$emit('deleteChild');
      }
    },
  };
</script>

<style>
  .modal-backdrop {
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
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 1em;
  }
</style>