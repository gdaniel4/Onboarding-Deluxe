<template>
  <div class="row justify-content-center">
  <router-link to='/create/event' class = "btn btn-primary">Create</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Event Name</th>
          <th>Event Description</th>
          <th>Total Attending</th>
          <th>Date (YYYY-MM-DD)</th>
          <th>Address</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in Events" :key="event.eventID">
          <td>{{ event.eventName }}</td>
          <td>{{ event.eventDescription }}</td>
          <td>{{ event.attending.length }}</td>
          <td>{{ event.eventDate.substring(0,10) }}</td>
          <td>{{ event.eventAddress }}</td>
          <td>
            <!--takes user to the signle client view that corelates to the client they choose-->
            <router-link :to="{name: 'singleevent', params: { id: event.eventID }}" class="btn btn-success ">View</router-link>
            </td>
            <!--takes user to the clients edit page-->
            <td><router-link :to="{name: 'editevents', params: { id: event.eventID }}" class="btn btn-success">Edit</router-link>
            </td><td>
            <!--deletes the client after confirming with the user-->
            <button @click.prevent="deleteEvents(event.eventID)" class="btn btn-danger mx">Delete</button>
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
                Events: []
            }
        },
        // this is using created hook 
        created() {
           let apiURL = 'http://localhost:3000/events/';
           //pulls event data from DB
            axios.get(apiURL).then(res => {
                this.Events = res.data;
                console.log(data);
            }).catch(error => {
                console.log(error)
            }); 
        },
        methods: {
            deleteEvents(id){
                let apiURL = `http://localhost:3000/events/${id}`;
                let indexOfArrayItem = this.Events.findIndex(i => i.eventID === id);
                //deletes the event using th especified id
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