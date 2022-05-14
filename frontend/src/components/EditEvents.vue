<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Event content -->
            <h3 class="text-center">Update Event</h3>
            <form @submit.prevent="handleUpdateForm">
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
                    <input type="date" class="form-control" v-model="event.eventDate">
                </div>

                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="event.eventAddress">
                </div>

                <button class="btn btn-danger mt-3">Update</button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
     data() {
        return {
            event: { } 
        }
    },
    created() {
        let apiURL = `http://localhost:3000/events/${this.$route.params.id}`;
        //collects event data
        axios.get(apiURL).then((res) => {
            console.log(res.data)
            this.event = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/events/${this.$route.params.id}`;
            //pushes data to db
            axios.put(apiURL, this.event).then((res) => {
                console.log(res)
                this.$router.push('/events')
            }).catch(error => {
                console.log(error)
            });
        }
    }
    }
</script>