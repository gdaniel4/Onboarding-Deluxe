<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Organization</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Organization Name</label>
                    <input type="text" class="form-control" v-model="org.orgName" required>
                </div>
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
                org: {
                   orgName: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/orgs/';
                
                axios.post(apiURL, this.org).then(() => {
                    //changing the view to the list
                  this.$router.push('/organizations')
                  this.org = {
                    orgName: ''
                  }
                }).catch(error => {
                    console.log(error)
                });
            }
        }
           
    }
</script>