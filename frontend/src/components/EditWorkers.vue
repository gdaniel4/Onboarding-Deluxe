<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Client content -->
            <h3 class="text-center">Update Worker</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="worker.firstName" required>
                </div>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="worker.lastName" required>
                </div>

                <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="form-control" v-model="worker.role" required>
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
            worker: { } 
        }
    },
    created() {
        let apiURL = `http://localhost:3000/workers/${this.$route.params.id}`;
        //collects worker data from the db
        axios.get(apiURL).then((res) => {
            console.log(res.data)
            this.worker = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/workers/${this.$route.params.id}`;
            //pushes data to the db
            axios.put(apiURL, this.worker).then((res) => {
                console.log(res)
                this.$router.push('/workers')
            }).catch(error => {
                console.log(error)
            });
        }
    }
    }
</script>