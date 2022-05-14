<template>
  <div class="row justify-content-center">
    <router-link to='/create/org' class = "btn btn-primary">Create</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Total Clients</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <!--Displays data from orgs-->
        <tr v-for="org in Orgs" :key="org.orgID">
          <td>{{ org.orgName }}</td>
          <td>{{ org.clients.length }}</td>
          <td>
            <router-link :to="{name: 'singleorganization', params: { id: org.orgID }}" class="btn btn-success ">View</router-link>
            </td>  
            <td><router-link :to="{name: 'editorgs', params: { id: org.orgID }}" class="btn btn-success ">Edit</router-link>
            </td><td>
            <button @click.prevent="deleteOrgs(org.orgID)" class="btn btn-danger">Delete</button>
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
           let apiURL = 'http://localhost:3000/orgs/';
           //gets all orgs info from db
            axios.get(apiURL).then(res => {
                this.Orgs = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteOrgs(id){
                let apiURL = `http://localhost:3000/orgs/${id}`;
                let indexOfArrayItem = this.Orgs.findIndex(i => i.orgID === id);
                //delets org from view and from db
                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Orgs.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        } 
    }
</script>