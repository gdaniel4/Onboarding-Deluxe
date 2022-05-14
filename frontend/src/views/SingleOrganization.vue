<template>
  <div class="row justify-content-center">
    <h3 class="text-center">Basic Information</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Total Clients</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="org in Orgs" :key="org.orgID">
          <td>{{ org.orgName }}</td>
          <td>{{ org.clients.length }}</td> 
            <td><router-link :to="{name: 'editorgs', params: { id: org.orgID }}" class="btn btn-success ">Edit</router-link>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    import axios from "axios";
    

    export default {
        data() {
            return {
                Orgs: []
            }
        },
        // this is using created hook 
        created() {
           let apiURL = `http://localhost:3000/orgs/arr/${this.$route.params.id}`;
           //gets org info from single org from db
            axios.get(apiURL).then(res => {
                this.Orgs = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteOrg(id){
                let apiURL = `http://localhost:3000/orgs/${id}`;
                let indexOfArrayItem = this.Events.findIndex(i => i.eventID === id);
                //delets org info db
                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Events.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
            
        }
    }
</script>