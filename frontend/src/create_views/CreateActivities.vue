<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Activity content -->
            <h3 class="text-center">Create Activity</h3>
            <form @submit.prevent="handleUpdateForm" >
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

                <!--sifts through the worker array to bring out the worker name and the id then sends the id only-->
                <div class = "form-group">
                    <label>Worker Name</label>
                    <select class = "form-control" v-model="activity.workerID" >
                        <!--<option value='' disable selected>Select Your Option</option> -->
                        <option v-for="worker in workers" :key="worker.workerID" :value="worker.workerID">
                        {{ worker.firstLast }}
                        </option>
                    </select>
                </div>
                <!--
               <div class = "form-group">
                    <label>Worker Name</label>
                    <select class = "form-control" @change="onChange($event)" >
                        <option value='' selected>Select Your Option</option>
                        <option v-for="worker in workers" :key="worker.workerID">
                        {{ worker.lastName }}
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
            activity: { },
            selected: null,
            workers: [ ]
        }
    },
    created() {
        let apiURL2 = `http://localhost:3000/workers/firstLast`;
        /*let apiURL = `http://localhost:3000/activities/`;
        
       
        axios.get(apiURL).then((res) => {
            console.log(res.data)
            this.activity = res.data;
        })*/
       //console.log('hellop')
       //collects data of workers from db
        axios.get(apiURL2).then((res) => {
            console.log(res.data)
            this.workers = res.data;

        })
    },

    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/activities/`;
            //console.log(this.activity)
            //pushes data to the db
            axios.post(apiURL, this.activity).then((res) => {
                //console.log(res)
                this.$router.push('/activities')
            }).catch(error => {
                console.log(error)
            });
        },
        //previously used method, no longer neccessary
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