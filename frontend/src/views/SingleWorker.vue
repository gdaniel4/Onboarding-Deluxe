<template>
  <div class="row justify-content-center">
    <h3 class="text-center">Basic Information</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Role</th>
          <th>Organization</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <!--Displays info the specific worker-->
        <tr v-for="worker in Workers" :key="worker.workerID">
          <td>{{ worker.lastName }}</td>
          <td>{{ worker.firstName }}</td>
          <td>{{ worker.role }}</td>          
          <td>{{ worker.orgName }}</td>
            <td><router-link :to="{name: 'editworkers', params: { id: worker.workerID }}" class="btn btn-success ">Edit</router-link>
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
           let apiURL = `http://localhost:3000/workers/summary/${this.$route.params.id}`;
           //Gets worker information the db
            axios.get(apiURL).then(res => {
                this.Workers = res.data;
                console.log(data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteWorker(id){
                let apiURL = `http://localhost:3000/workers/${id}`;
                let indexOfArrayItem = this.Workers.findIndex(i => i.workerID === id);
                //deletes worker from view and from the db
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