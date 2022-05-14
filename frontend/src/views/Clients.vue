<template>
  <div class="row justify-content-center">
    <router-link to='/create/client' class = "btn btn-primary">Create</router-link> 
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Client Last Name</th>
          <th>Client First Name</th>
          <th>Phone Number</th>
          <th>Sex</th>
          <th>Organization</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.lastName }}</td>
          <td>{{ client.firstName }}</td>
          <td>{{ client.cellNum }}</td>
          <td>{{ client.gender }}</td>
          <td>{{ client.orgName }}</td>
          <td>
            <router-link :to="{name: 'singleclient', params: { id: client.clientID }}" class="btn btn-success ">View</router-link>
            </td>
            <td><router-link :to="{name: 'edit', params: { id: client.clientID }}" class="btn btn-success ">Edit</router-link>
            </td> 
            <td><button @click.prevent="deleteClient(client.clientID,client.orgID)" class="btn btn-danger">Delete</button>
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
                Clients: []
            }
        },
        // this is using created hook 
        created() {
           let apiURL = 'http://localhost:3000/clients/client/sum';
            axios.get(apiURL).then(res => {
                this.Clients = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteClient(id,orgID){
                let apiURL = `http://localhost:3000/clients/${id}`;
                let indexOfArrayItem = this.Clients.findIndex(i => i.clientID === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Clients.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
                var json = {
                  'orgID': orgID,
                  'clientID': id
                }
                console.log(json);
                axios.put(`http://127.0.0.1:3000/orgs/remove/clients/${orgID}/${id}`).then((res2) => {
                  console.log(res2.data)
                }).catch(error => {
                  console.log(error)
                });
                
            }
        }
    }
</script>