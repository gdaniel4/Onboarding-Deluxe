<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Worker</h3>
            <form @submit.prevent="handleSubmitForm">
                
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
                <div class = "form-group"></div>
                    <label>Organization</label>
                    <select class = "form-control" v-model="worker.orgID">
                        <option v-for="org in Orgs" :key="org.orgName" :value="org.orgID">
                        {{ org.orgName }}
                        </option>
                    </select>
                
                <button class="btn btn-success mt-3">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                worker: { },
                Orgs: []
            }
        },
        created() {
            let apiURL = `http://localhost:3000/orgs/`;
       
            axios.get(apiURL).then((res) => {
                console.log(res.data)
                this.Orgs = res.data;
            })
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/workers/';
                
                axios.post(apiURL, this.worker).then(() => {
                    //changing the view to the list
                  this.$router.push('/workers')
                }).catch(error => {
                    console.log(error)
                });
            }
        }
           
    }
</script>