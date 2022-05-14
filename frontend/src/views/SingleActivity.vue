<template>
  <div class="row justify-content-center">
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Program </th>
          <th>Notes</th>
          <th>Date (YYYY-MM-DD)</th>
          <th>Time Spent</th>
          <th>Worker Last Name</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <!--displays all client activities info-->
        <tr v-for="activity in Activities" :key="activity.activityID">
          <td>{{ activity.program }}</td>
          <td>{{ activity.shortNotes }}</td>
          <td>{{ activity.datetime.substring(0,10)}}</td>
          <td>{{ activity.timeSpend }}</td>
          <td>{{ activity.workerLastName }}</td>
          <td>
            <router-link :to="{name: 'editactivities', params: { id: activity.activityID }}" class="btn btn-success ">Edit</router-link>
            </td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
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
                Activities: []
            }
        },
        // this is using created hook 
        created() {
           let apiURL = `http://localhost:3000/activities/summary/${this.$route.params.id}`;
           //gets single client info from db
            axios.get(apiURL).then(res => {
                this.Activities = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteActivities(id){
                let apiURL = `http://localhost:3000/actvities/${id}`;
                let indexOfArrayItem = this.Activities.findIndex(i => i.activityID === id);
                //deletes client info from view and db
                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Activities.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
            
        }
    }
</script>