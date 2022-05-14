<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Organization content -->
            <h3 class="text-center">Update Organization</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="org.orgName" required>
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
            org: { } 
        }
    },
    created() {
        let apiURL = `http://localhost:3000/orgs/${this.$route.params.id}`;
        //collects org data from db
        axios.get(apiURL).then((res) => {
            this.org = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/orgs/${this.$route.params.id}`;
            //pushes data to the db
            axios.put(apiURL, this.org).then((res) => {
                console.log(res)
                this.$router.push('/organizations')
            }).catch(error => {
                console.log(error)
            });
        }
    }
    }
</script>