<template>
  <h1>Home</h1>
  <div class="border p-2">
    <h2>Parent</h2>
    <label for="parent-select" class="form-label">Parent: </label>
    <select v-model="selectedParentId" class="form-select">
      <option v-for="parent in parents" v-bind:value="parent.id" v-bind:key="parent.id" id="parent-select">
        {{ parent.name }}
      </option>
    </select>
    <button @click="newParent" class="btn btn-primary mt-2">Create new parent</button>
  </div>

  <div class="border mt-2 p-2">
    <h2>Children</h2>
    <ul class="list-group">
      <li v-for="child in children" v-bind:key="child.id" class="list-group-item  d-flex justify-content-between align-items-center">
        {{ child.name }}
        <button @click="deleteChild(child.id)" class="btn btn-danger">Delete</button>
      </li>
    </ul>
    <button @click="newChild" class="btn btn-primary  mt-2">Create new child</button>
  </div>
  <DeleteModal v-if="isDeleteChildModalVisible"
    @close="closeModal" @deleteOk="deleteFromModalChild"
    typeOfElement="Child" :nameOfElement="nameOfselectedChild" />
</template>

<script>
import DeleteModal from "../components/DeleteModal.vue";
export default {
  components:{
    DeleteModal,
  },
  data(){   
    return {
      isDeleteChildModalVisible: false,
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
    },
    nameOfselectedChild(){
      const selectedChild = this.$store.getters.childrenSet
        .filter(child => 
          child.id === this.$data.selectedChildId
        )[0];
      return selectedChild.name;
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
      this.isDeleteChildModalVisible = true;
    },
    closeModal() {
      this.isDeleteChildModalVisible = false;
    },
    deleteFromModalChild(){      
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
