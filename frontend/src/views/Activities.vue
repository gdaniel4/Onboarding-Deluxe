<template>
  <div class="row justify-content-center">
    <router-link to='/create/activity' class = "btn btn-primary">Create</router-link>    
    <table class="table table-striped">
      <thead class="table-dark">
        <!--Displays a shortened version of all acitivies-->
        <tr>
          <th>Program </th>
          <th>Notes</th>
          <th>Date (YYYY-MM-DD)</th>
          <th>Time Spent</th>
          <th>Worker Last Name</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in Activities" :key="activity.activityID">
          <td>{{ activity.program }}</td>
          <td>{{ activity.shortNotes }}</td>
          <td>{{ activity.datetime.substring(0,10) }}</td>
          <td>{{ activity.timeSpend }}</td>
          <td>{{ activity.workerLastName }}</td>
          <td>
            <!--takes user to the single activity view for the activity they choose-->
            <router-link :to="{name: 'singleactivity', params: { id: activity.activityID }}" class="btn btn-success ">View</router-link>
            </td>
            <td><router-link :to="{name: 'editactivities', params: { id: activity.activityID }}" class="btn btn-success ">Edit</router-link>
            </td>
            <td>
            <button @click.prevent="deleteActivities(activity.activityID)" class="btn btn-danger mx">Delete</button>
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
                Activities: []
            }
        },
        // this is using created hook 
        created() {
           let apiURL = 'http://localhost:3000/activities/summary';
            axios.get(apiURL).then(res => {
                this.Activities = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteActivities(id){
                let apiURL = `http://localhost:3000/activities/${id}`;
                let indexOfArrayItem = this.Activities.findIndex(i => i.activityID === id);

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