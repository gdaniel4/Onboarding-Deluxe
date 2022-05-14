<template>
<div class="row justify-content-center">
    <h3 class="text-center">Basic Information</h3>

    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Event Name</th>
          <th>Event Description</th>
          <th>Total Attending</th>
          <th>Date (YYYY-MM-DD)</th>
          <th>Address</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="event in Events" :key="event.eventID">
          <td>{{ event.eventName }}</td>
          <td>{{ event.eventDescription }}</td>
          <td>{{ event.attending.length }}</td>
          <td>{{ event.eventDate.substring(0,10) }}</td>
          <td>{{ event.eventAddress }}</td>

            <td><router-link :to="{name: 'editevents', params: { id: event.eventID }}" class="btn btn-success">Edit</router-link>
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
                Events: []
            }
        },
        // this is using created hook 
        created() {
           let apiURL = `http://localhost:3000/events/arr/${this.$route.params.id}`;
           //gets event info fro single event from db
            axios.get(apiURL).then(res => {
                this.Events = res.data;
                console.log(data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteClient(id){
                let apiURL = `http://localhost:3000/events/${id}`;
                let indexOfArrayItem = this.Events.findIndex(i => i.eventID === id);
                //deletes event info from view and db
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