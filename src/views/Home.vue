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
    <div>
      <button @click="deleteParent" class="btn btn-danger mt-2 me-2">Delete selected parent</button>
      <button @click="newParent" class="btn btn-primary mt-2">Create new parent</button>
    </div>
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

  <DeleteModal v-if="isDeleteParentModalVisible"
    @close="closeModal" @deleteOk="deleteFromModalParent"
    typeOfElement="Parent" :nameOfElement="nameOfselectedParent" />

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
      isDeleteParentModalVisible: false,
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
    },    
    nameOfselectedParent(){
      const selectedParent = this.$store.getters.parentSet
        .filter(parent => 
          parent.id === this.$data.selectedParentId
        )[0];
      return selectedParent.name;
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
      this.showDeleteChildModal();
    },
    deleteParent(){      
      console.log(this.selectedParentId);
      this.showDeleteParentModal();
    },
    showDeleteChildModal() {
      this.isDeleteChildModalVisible = true;
    },
    showDeleteParentModal() {
      this.isDeleteParentModalVisible = true;
    },
    closeModal() {
      this.isDeleteParentModalVisible = false;
      this.isDeleteChildModalVisible = false;
    },
    deleteFromModalParent(){      
      this.$store.commit('deleteParent', this.selectedParentId);
      this.closeModal();
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
