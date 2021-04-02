<template>
  <h1>Home</h1>
  <h2>Parent</h2>
  <label for="parent-select">Parent: </label>
  <select v-model="selectedParentId">
    <option v-for="parent in parents" v-bind:value="parent.id" v-bind:key="parent.id" id="parent-select">
      {{ parent.name }}
    </option>
  </select>
  <button @click="newParent">Create new parent</button>

  <h2>Children</h2>
  <ul>
    <li v-for="child in children" v-bind:key="child.id">
      {{ child.name }}
      <button @click="deleteChild(child.id)">Delete</button>
    </li>
  </ul>
  <button @click="newChild">Create new child</button>

  <DeleteModal v-if="isModalVisible" @close="closeModal" @deleteChild="deleteFromModal" />
</template>

<script>
import DeleteModal from "../components/DeleteModal.vue";
export default {
  components:{
    DeleteModal,
  },
  data(){   
    return {
      isModalVisible: false,
      selectedParentId: null,
      selectedChildId: null
    }
  },
  computed: {    
    parents(){
      return this.$store.getters.parentSet;
    },
    children(){
      return this.$store.getters.childrenSet
        .filter(child => 
          child.parent === this.$data.selectedParentId
        );
    }    
  },
  methods:{
    newParent(){
      this.$router.push('/create-parent');
    },
    newChild(){
      this.$router.push('/create-child');
    },
    deleteChild(id){      
      this.selectedChildId = id;
      this.showModal();
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    deleteFromModal(){      
      this.$store.commit('deleteChild', this.selectedChildId);
      this.closeModal();
    }
  },
  mounted(){
    // store -> local data
    this.$data.selectedParentId = this.$store.state.selectedParentId;
  },
  watch: {
    // local data -> store
    selectedParentId: function(){
      this.$store.commit('setSelectedParentId', this.$data.selectedParentId);
    }
  }
}
</script>
