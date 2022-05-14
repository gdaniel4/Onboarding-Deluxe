<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Event content -->
            <h3 class="text-center">Create Event</h3>
            <form @submit.prevent="handleUpdateForm" >
                <div class="form-group">
                    <label>Event Name</label>
                    <input type="text" class="form-control" v-model="event.eventName" required>
                </div>

                <div class="form-group">
                    <label>Event Description</label>
                    <input type="text" class="form-control" v-model="event.eventDescription" required>
                </div>

                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-control" v-model="event.eventDate" required>
                </div>

                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="event.eventAddress">
                </div>
                <!--POSSIBLE MAKE THIS A SEARCH BAR, doesnt make sense as a dropdown by will keep
                 https://www.digitalocean.com/community/tutorials/html-html5-inputs 
                 https://www.digitalocean.com/community/tutorials/vuejs-vue-autocomplete-component
                <div class = "form-group">
                    <label>Attending</label>
                    <select class = "form-control" v-model="event.attending">
                        <option v-for="client in clients" :key="client.clientID" :value="client.clientID">
                        {{ client.firstLast }}
                        </option>
                        </select>
                </div> -->                
                <button class="btn btn-success mt-3" >Create</button>
                
            
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
//@click='updateworker()'
export default {
     data() {
        return {
            event: { },
            selected: null,
            clients: [ ]
        }
    },
    created() {
        let apiURL2 = `http://localhost:3000/clients/client/sum/firstlast`;
        axios.get(apiURL2).then((res) => {
            console.log(res.data)
            this.clients = res.data;

        })
    },

    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/events/`;
            //console.log(this.activity)
            axios.post(apiURL, this.event).then((res) => {
                //console.log(res)
                this.$router.push('/events')
            }).catch(error => {
                console.log(error)
            });
        },
        onChange(event){
            var optionText = this.workers[event.target.options.selectedIndex].workerID;
            console.log(optionText);
            this.activity.workerID = optionText;
        }
            /*,
        //try making a route in the backeend that matches lastname with worker ID
        //PROBABLY EASIER: make a new button on the activities page that allows user to assing worker to specific
        //--activity, (already have a route for that)
        updateworker() {
            let woID = worker.workerID;
            let apiURL2 = `http://localhost:3000/activities/update/worker/`;
            let newURL = apiURL2.concat(woID);
            axios.put(newURL, this.activity).then((res) =>{
                console.log(res.data)
                 }).catch(error => {
                console.log(error)            
            });
        }*/
        }
    }
</script>