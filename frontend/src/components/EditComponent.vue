<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Update Client content -->
            <h3 class="text-center">Update Client</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="client.firstName" required>
                </div>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="client.lastName" required>
                </div>

                <div class="form-group">
                    <label>Birthday *</label>
                    <input type="date" class="form-control" v-model="client.birthday" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="client.personalEmail" required>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="client.cellNum" required>
                </div>

                <div class="form-group">
                    <label>Sex</label>
                    <select class = "form-control" v-model="client.gender">
                        <!-- CAN TURN INTO BOOLEAN (POSSIBLY) BY USING :value=true / false
                             CHECK LINE 32 OF CreateActivities.vue -->
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
                    <!-- CAN TURN INTO BOOLEAN (POSSIBLY) BY USING :value=true / false
                             CHECK LINE 32 OF CreateActivities.vue -->
                </div>

                <div class="form-group">
                    <label>Has Utilties?</label>
                    <select class = "form-control" v-model="client.hasUtilities">
                        <!-- CAN TURN INTO BOOLEAN (POSSIBLY) BY USING :value=true / false
                             CHECK LINE 32 OF CreateActivities.vue -->
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Is Subsidized?</label>
                    <select class = "form-control" v-model="client.isSubsidized">
                        <!-- CAN TURN INTO BOOLEAN (POSSIBLY) BY USING :value=true / false
                             CHECK LINE 32 OF CreateActivities.vue -->
                        <option value="Yes" style="color:black" >Yes</option>
                        <option value="No" style="color:black" >No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Single Parent?</label>
                    <select class = "form-control" v-model="client.isSingleParent">
                        <!-- CAN TURN INTO BOOLEAN (POSSIBLY) BY USING :value=true / false
                             CHECK LINE 32 OF CreateActivities.vue -->
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
                        <!-- CAN TURN INTO BOOLEAN (POSSIBLY) BY USING :value=true / false
                             CHECK LINE 32 OF CreateActivities.vue -->
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
                    <label>Last Grade</label>
                    <select class = "form-control" v-model="client.lastGrade">
                        <!-- CAN TURN INTO BOOLEAN (POSSIBLY) BY USING :value=true / false
                             CHECK LINE 32 OF CreateActivities.vue -->
                        <option value="12th" style="color:black" >12th</option>
                        <option value="11th" style="color:black" >11th</option>
                        <option value="10th" style="color:black" >10th</option>
                        <option value="9th" style="color:black" >9th</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Has Graduated High School? *</label>
                    <select class = "form-control" v-model="client.hasGraduated" required>
                        <!-- CAN TURN INTO BOOLEAN (POSSIBLY) BY USING :value=true / false
                             CHECK LINE 32 OF CreateActivities.vue -->
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

                <!--Filters through orgs to display the names but passes only the orgID-->
                <div class = "form-group">
                    <label>Organization *</label>
                    <select class = "form-control" v-model="client.orgID" >
                        <option v-for="org in orgs" :key="org.orgID" :value="org.orgID">
                        {{ org.orgName }}
                        </option>
                    </select>
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
            client: { },
            orgs: [ ]
        }
    },
    created() {
        let apiURL = `http://localhost:3000/clients/client/sum/${this.$route.params.id}`;
        let apiURL2 = `http://localhost:3000/orgs/`;
        //collects client info from db
        axios.get(apiURL).then((res) => {
            console.log(res.data)
            this.client = res.data[0];
        }),
        //Collects org info from db
        axios.get(apiURL2).then((res) => {
            console.log(res.data)
            this.orgs = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/clients/${this.$route.params.id}`;
            //Sends data and pushes it to the db
            axios.put(apiURL, this.client).then((res) => {
                console.log(res)
                this.$router.push('/clients')
            }).catch(error => {
                console.log(error)
            });
        }
    }
    }
</script>