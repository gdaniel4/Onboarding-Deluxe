<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Activity content -->
            <h3 class="text-center">Create Client</h3>
            <h5 class="text-center">* = Required</h5>
            <form @submit.prevent="handleUpdateForm" >
                <div class="form-group">
                    <label>Client Last Name *</label>
                    <input type="text" class="form-control" v-model="client.lastName" required>
                </div>

                <div class="form-group">
                    <label>Client First Name *</label>
                    <input type="text" class="form-control" v-model="client.firstName" required>
                </div>

                <div class="form-group">
                    <label>Birthday *</label>
                    <input type="date" class="form-control" v-model="client.birthday" required>
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <select class = "form-control" v-model="client.gender">
                        <option value="Male" style="color:black" >Male</option>
                        <option value="Female" style="color:black" >Female</option>
                        <option value="Prefer Not to Say" style="color:black" >Prefer Not to Say</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Driver License # *</label>
                    <input type="text" class="form-control" v-model="client.driverLicense" required>
                </div>

                <h3 class="text-center">Residence</h3>

                <div class="form-group">
                    <label>Address *</label>
                    <input type="text" class="form-control" v-model="client.address" required>
                </div>

                <div class="form-group">
                    <label>City *</label>
                    <input type="text" class="form-control" v-model="client.city" required>
                </div>

                <div class="form-group">
                    <label>State *</label>
                    <input type="text" class="form-control" v-model="client.state" required>
                </div>

                <div class="form-group">
                    <label>County *</label>
                    <input type="text" class="form-control" v-model="client.county" required>
                </div>

                <div class="form-group">
                    <label>Zipcode *</label>
                    <input type="number" class="form-control" v-model="client.zip" required>
                </div>

                <div class="form-group">
                    <label>Total Rent</label>
                    <input type="number" class="form-control" v-model="client.totalRent">
                </div>

                <div class="form-group">
                    <label>Living Arrangements</label>
                    <input type="number" class="form-control" v-model="client.livingArrangements">
                </div>

                <div class="form-group">
                    <label>Has Utilties?</label>
                    <select class = "form-control" v-model="client.hasUtilities">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Is Subsidized?</label>
                    <select class = "form-control" v-model="client.isSubsidized">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Single Parent?</label>
                    <select class = "form-control" v-model="client.isSingleParent">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <h4 class="text-center">Contact</h4>

                <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="123-456-7890" pattern="([0-9]{3})-[0-9]{3}-[0-9]{4}" class="form-control" v-model="client.cellNum" required>
                </div>

                <div class="form-group">
                    <label>Personal Email *</label>
                    <input type="email" class="form-control" placeholder="name@email.com" v-model="client.personalEmail" required>
                </div>

                <div class="form-group">
                    <label>Preffered Language *</label>
                    <input type="text" class="form-control" v-model="client.language" required>
                </div>

                <div class="form-group">
                    <label>Marital Status *</label>
                    <select class = "form-control" v-model="client.maritalStatus" required>
                        <option value="Single" style="color:black" >Single</option>
                        <option value="Married" style="color:black" >Married</option>
                        <option value="Divorced" style="color:black" >Divorced</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Ethnicity *</label>
                    <input type="text" class="form-control" v-model="client.ethnicity" required>
                </div>

                <h4 class="text-center">Education</h4>

                <div class="form-group">
                    <label>Name of Last School Attended</label>
                    <input type="text" class="form-control" v-model="client.school">
                </div>

                <div class="form-group">
                    <label>Last Letter Grade</label>
                    <select class = "form-control" v-model="client.lastGrade">
                        <option value="A" style="color:black" >A</option>
                        <option value="B" style="color:black" >B</option>
                        <option value="C" style="color:black" >C</option>
                        <option value="D" style="color:black" >D</option>
                        <option value="F" style="color:black" >F</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Has Graduated High School? *</label>
                    <select class = "form-control" v-model="client.hasGraduated" required>
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>College?</label>
                    <select class = "form-control" v-model="client.attendingAttendedCollege">
                        <option value="Attending" style="color:black" >Attending</option>
                        <option value="Attended" style="color:black" >Attended</option>
                        <option value="Graduated" style="color:black" >Graduated</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Certifications</label>
                    <input type="text" class="form-control" v-model="client.certifications">
                </div>

                <h3 class="text-center">Employment</h3>

                <div class="form-group">
                    <label>Employment Status *</label>
                    <select class = "form-control" v-model="client.employmentStatus" required>
                        <option value="Employed" style="color:black" >Employed</option>
                        <option value="Unemployed" style="color:black" >Unemployed</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Length of Employment (Years) *</label>
                    <input type="number" class="form-control" v-model="client.lengthOfEmployment" required>
                </div>

                <div class="form-group">
                    <label>Employer</label>
                    <input type="text" class="form-control" v-model="client.employer">
                </div>

                <div class="form-group">
                    <label>Occupation</label>
                    <input type="text" class="form-control" v-model="client.occupation">
                </div>

                <h3 class="text-center">Government Help</h3>

                <div class="form-group">
                    <label>TANF</label>
                    <select class = "form-control" v-model="client.tanf">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>SSI</label>
                    <select class = "form-control" v-model="client.ssi">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Unemployment</label>
                    <select class = "form-control" v-model="client.unemployment">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Social Security</label>
                    <select class = "form-control" v-model="client.socialSecurity">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <h3 class="text-center">Health</h3>

                <div class="form-group">
                    <label>Health Insurance</label>
                    <select class = "form-control" v-model="client.hasHealthInsurance">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Name of Health Insurance</label>
                    <input type="text" class="form-control" v-model="client.healthInsuranceProgram">
                </div>
                
                <div class="form-group">
                    <label>Pregnant? *</label>
                    <select class = "form-control" v-model="client.isPregnancy" required>
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Teen Parent?</label>
                    <select class = "form-control" v-model="client.isTeenParent">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Delivery Month</label>
                    <select class = "form-control" v-model="client.deliveryMonth">
                        <option value="January" style="color:black" >January</option>
                        <option value="Febuary" style="color:black" >Febuary</option>
                        <option value="March" style="color:black" >March</option>
                        <option value="April" style="color:black" >April</option>
                        <option value="May" style="color:black" >May</option>
                        <option value="June" style="color:black" >June</option>
                        <option value="July" style="color:black" >July</option>
                        <option value="August" style="color:black" >August</option>
                        <option value="September" style="color:black" >September</option>
                        <option value="October" style="color:black" >October</option>
                        <option value="November" style="color:black" >November</option>
                        <option value="December" style="color:black" >December</option>
                    </select>
                </div>

                <h3 class="text-center">Income</h3>

                <div class="form-group">
                    <label>Head of Household?</label>
                    <select class = "form-control" v-model="client.isHeadOfHousehold">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Monthly Income</label>
                    <input type="number" class="form-control" v-model="client.monthlyIncome">
                </div>

                <div class="form-group">
                    <label>Workers Compensation</label>
                    <input type="number" class="form-control" v-model="client.workComp">
                </div>

                <div class="form-group">
                    <label>Child Support</label>
                    <input type="number" class="form-control" v-model="client.childSupport">
                </div>

                <div class="form-group">
                    <label>Food Stamps?</label>
                    <select class = "form-control" v-model="client.hasFoodStamps">
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Food Stamps Amount</label>
                    <input type="number" class="form-control" v-model="client.foodStampsAmount">
                </div>

                <div class="form-group">
                    <label>Food Stamps Reason</label>
                    <input type="text" class="form-control" v-model="client.foodStampsReason">
                </div>

                <div class="form-group">
                    <label>Other Income</label>
                    <input type="number" class="form-control" v-model="client.otherIncome">
                </div>

                <!--
                <div class = "form-group">
                    <label>Organization</label>
                    <select class = "form-control" v-model="client.orgName">
                        <option v-for="org in orgs" :key="org.orgID">
                        {{ org.orgName }}
                        </option>
                    </select>
                </div>
                -->

                <!--Sifts through the org array to collect the org name and the id and sends only the id-->
                <div class = "form-group">
                    <label>Organization *</label>
                    <select class = "form-control" v-model="client.orgID" required>
                        <option v-for="org in orgs" :key="org.orgID" :value="org.orgID">
                        {{ org.orgName }}
                        </option>
                    </select>
                </div>

                <button class="btn btn-success mt-3" >Create</button>                

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
     data() {
        return {
            client: { },
            selected: null,
            orgs: []
        }
    },
    created() {
        let apiURL2 = `http://localhost:3000/orgs/`;
        /*let apiURL = `http://localhost:3000/activities/`;
        
       
        axios.get(apiURL).then((res) => {
            console.log(res.data)
            this.activity = res.data;
        })*/
       
        axios.get(apiURL2).then((res) => {
            console.log(res.data)
            this.orgs = res.data;
        })
    },

    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/clients/`;
            //sends collected data to the db
            axios.post(apiURL, this.client).then((res) => {
                console.log(res.data)
                this.$router.push('/clients')
            }).catch(error => {
                console.log(error)
            }).then(() =>
            //only after data is sent
            //runs a call to get the most recntly added client to get their id and orgID
            axios.get(`http://127.0.0.1:3000/clients/recent/one`).then((res2) => {
                //data is placed in a json format
                var json = {
                    'orgID': res2.data[0].orgID,
                    'clientID': res2.data[0].clientID
                }
                //jsonified data is then sent to the db where it is stored in the orgs client list
                axios.put(`http://127.0.0.1:3000/orgs/update/clients`,json).then((res3) => {
                    console.log(res3.data)
                }).catch(error => {
                    console.log(error)
                });
            }).catch(error => {
                console.log(error)
            }));
        },
        // handleUpdateForm() {
        //     let apiURL = `http://localhost:3000/clients/`;
        //     //sends collected data to the db
        //     axios.post(apiURL, this.client).then((res) => {
        //         console.log(res.data)
        //         this.$router.push('/clients')
        //     }).catch(error => {
        //         console.log(error)
        //     }).then(() =>
        //     //only after data is sent
        //     //runs a call to get the most recntly added client to get their id and orgID
        //     axios.get(`http://127.0.0.1:3000/clients/recent/one`).then((res2) => {
        //         //data is placed in a json format
        //         var json = {
        //             'orgID': res2.data[0].orgID,
        //             'clientID': res2.data[0].clientID
        //         };console.log(res2.data);
        //         }).catch(error => {
        //           console.log(error)
        //         }).then(() =>
        //         //jsonified data is then sent to the db where it is stored in the orgs client list
        //         axios.put(`http://127.0.0.1:3000/orgs/update/clients`,json).then((res3) => {
        //             console.log(res3.data)
        //         }).catch(error => {
        //             console.log(error)
        //         })));
        //},
        //try making a route in the backeend that matches lastname with worker ID
        //PROBABLY EASIER: make a new button on the activities page that allows user to assign worker to specific
        //--activity, (already have a route for that)
        updateworker() {
            let apiURL2 = `http://localhost:3000/activities/${activity.activityID}`;
            axios.put(apiURL2, this.activity.workerID.$route).then((res) =>{
                console.log(res.data)
                 }).catch(error => {
                console.log(error)
            });
        }
    }
    }
</script>