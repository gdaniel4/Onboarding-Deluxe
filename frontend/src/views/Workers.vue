<template>
  <div class="row justify-content-center">
    <router-link to='/create/worker' class = "btn btn-primary">Create</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Role</th>
          <th>Organization</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="worker in Workers" :key="worker.workerID">
          <td>{{ worker.lastName }}</td>
          <td>{{ worker.firstName }}</td>
          <td>{{ worker.role }}</td>          
          <td>{{ worker.orgName }}</td>
          <td>
            <router-link :to="{name: 'singleworker', params: { id: worker.workerID }}" class="btn btn-success ">View</router-link>
            </td>
            <td><router-link :to="{name: 'editworkers', params: { id: worker.workerID }}" class="btn btn-success ">Edit</router-link>
            </td><td>
            <button @click.prevent="deleteWorkers(worker.workerID)" class="btn btn-danger mx-2">Delete</button>
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
                Workers: []
            }
        },
        // this is using created hook 
        created() {
           let apiURL = 'http://localhost:3000/workers/summary';
           //gets all workers info from the db
            axios.get(apiURL).then(res => {
                this.Workers = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteWorkers(id){
                let apiURL = `http://localhost:3000/workers/${id}`;
                let indexOfArrayItem = this.Workers.findIndex(i => i.workerID === id);
                //delets worker from view and from the array
                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Workers.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        } 
    }
</script>