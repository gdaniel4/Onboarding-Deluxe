<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Activity content -->
            <h3 class="text-center">Update Activity</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Program Name</label>
                    <input type="text" class="form-control" v-model="activity.program" required>
                </div>

                <div class="form-group">
                    <label>Activity Description</label>
                    <input type="text" class="form-control" v-model="activity.shortNotes" required>
                </div>

                <div class="form-group">
                    <label>Date</label>
                    <input type="date" class="form-control" v-model="activity.datetime">
                </div>

                <div class="form-group">
                    <label>Time Spent</label>
                    <input type="number" class="form-control" v-model="activity.timeSpend" required>
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
            activity: { } 
        }
    },
    created() {
        let apiURL = `http://localhost:3000/activities/activity/${this.$route.params.id}`;

        axios.get(apiURL).then((res) => {
            this.activity = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            //Sends collected data to db
            let apiURL = `http://localhost:3000/activities/${this.$route.params.id}`;

            axios.put(apiURL, this.activity).then((res) => {
                console.log(res)
                //refreshes page to /activities
                this.$router.push('/activities')
            }).catch(error => {
                console.log(error)
            });
        }
    }
    }
</script>