<template>
  <h1>Home</h1>
  <div class="border p-2">
    <h2>Parent</h2>
    <select v-if="parentExists" v-model="selectedParentId" class="form-select">
      <option v-for="parent in parents" v-bind:value="parent.id" v-bind:key="parent.id" id="parent-select">
        {{ parent.name }}
      </option>
    </select>
    <div>
      <button v-if="parentExists" @click="deleteParent" class="btn btn-danger mt-2 me-2">Delete selected parent</button>
      <button @click="newParent" class="btn btn-primary mt-2">Create new parent</button>
    </div>
  </div>

  <div v-if="parentExists" class="border mt-2 p-2">
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
    @close="closeModalParent" @deleteOk="deleteFromModalParent"
    typeOfElement="Parent" :nameOfElement="nameOfSelectedParent" />

  <DeleteModal v-if="isDeleteChildModalVisible"
    @close="closeModalChild" @deleteOk="deleteFromModalChild"
    typeOfElement="Child" :nameOfElement="nameOfSelectedChild" />
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
      selectedChildId: null
    }
  },
  computed: {    
    parents(){
      return this.$store.getters.parentSet;
    },
    parentExists(){
      return this.$store.getters.parentExists;
    },
    selectedParentId: {
      get(){
        return this.$store.state.selectedParentId;
      },
      set(id){
        this.$store.dispatch('updateSelectedParentId',id);
      }
    },
    children(){
      return this.$store.getters.childrenOfSelectedParent;      
    },
    nameOfSelectedChild(){
      const selectedChild = this.$store.getters.childrenOfSelectedParent
        .filter(child => 
          child.id === this.$data.selectedChildId
        )[0];
      return selectedChild.name;
    },    
    nameOfSelectedParent(){
      const selectedParent = this.$store.getters.parentSet
        .filter(parent => 
          parent.id === this.$store.state.selectedParentId
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
      this.showDeleteParentModal();
    },
    showDeleteChildModal() {
      this.isDeleteChildModalVisible = true;
    },
    showDeleteParentModal() {
      this.isDeleteParentModalVisible = true;
    },
    closeModalParent() {
      this.isDeleteParentModalVisible = false;      
    },
    closeModalChild() {
      this.isDeleteChildModalVisible = false;      
    },
    deleteFromModalParent(){      
      this.$store.dispatch('deleteSelectedParent');
      this.closeModalParent();
    },
    deleteFromModalChild(){      
      this.$store.dispatch('deleteChild', this.selectedChildId);
      this.closeModalChild();
    }
  }
}
</script>
