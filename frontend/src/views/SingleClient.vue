<template>
  <div class="row justify-content-center">
    <h3 class="text-center">Basic Information</h3>

    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Client Last Name</th>
          <th>Client First Name</th>
          <th>Middle Initial</th>
          <th>Phone Number</th>
          <th>Sex</th>
          <th>Organization</th>
          <th>Birthday</th>
          <th>Social Sec. #</th>
          <th>Veteran</th>
          <th>Over 65</th>
          <th>Vaccinated</th>
          <th>Driver's License Number</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.lastName }}</td>
          <td>{{ client.firstName }}</td>
          <td>{{client.middleInitial}}</td>
          <td>{{ client.cellNum }}</td>
          <td>{{ client.gender }}</td>
          <td>{{ client.orgName }}</td>
          <td>{{ client.birthday }}</td>
          <td>{{ client.socialSecurity }}</td>
          <td>{{ client.isVeteran }}</td>
          <td>{{ client.is65orOlder }}</td>
          <td>{{client.isVaccinated }}</td>
          <td>{{client.driverLicense }}</td>
          <td>
            <router-link :to="{name: 'edit', params: { id: client.clientID }}" class="btn btn-success ">Edit</router-link>
            </td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Clients' Activities</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Activity Name </th>
          <th>Date</th>
          <th>Description</th>
          <th>Length (Hours)</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="act in ExArray" :key="act.activityID">
          <td>{{ act.program }}</td>
          <td>{{ act.datetime.substring(0,10) }}</td>
          <td>{{ act.shortNotes }}</td>
          <td>{{ act.timeSpend }}</td>
          <td><button @click.prevent="deleteActivity(act.activityID)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h3 class="text-center">Clients' Events</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Event Name</th>
          <th>Event Description</th>
          <th>Total Attending</th>
          <th>Date (YYYY-MM-DD)</th>
          <th>Address</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in ClientsEvents" :key="event.eventID">
          <td>{{ event.eventName }}</td>
          <td>{{ event.eventDescription }}</td>
          <td>{{ event.attending.length }}</td>
          <td>{{ event.eventDate.substring(0,10) }}</td>
          <td>{{ event.eventAddress }}</td>
          <td> <button @click.prevent="deleteEvent(event.eventID)" class="btn btn-danger">Delete</button> 
          </td>
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Activities</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Activity Name </th>
          <th>Date</th>
          <th>Description</th>
          <th>Length (Hours)</th>
          <th>Add</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="act in Activities" :key="act.activityID">
          <td>{{ act.program }}</td>
          <td>{{ act.datetime.substring(0,10) }}</td>
          <td>{{ act.shortNotes }}</td>
          <td>{{ act.timeSpend }}</td>
          <td><button @click.prevent="addAct(act.activityID)" class="btn btn-success">Add</button></td>
        </tr>
      </tbody>
    </table>

    <h3 class="text-center">Events</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Event Name</th>
          <th>Event Description</th>
          <th>Total Attending</th>
          <th>Date (YYYY-MM-DD)</th>
          <th>Address</th>
          <th>Add</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in Events" :key="event.eventID">
          <td>{{ event.eventName }}</td>
          <td>{{ event.eventDescription }}</td>
          <td>{{ event.attending.length }}</td>
          <td>{{ event.eventDate.substring(0,10) }}</td>
          <td>{{ event.eventAddress }}</td>       
          <td><button @click.prevent="addEvent(event.eventID)" class="btn btn-success">Add</button></td>
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Residence</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Address </th>
          <th>City</th>
          <th>State</th>
          <th>County</th>
          <th>Zip</th>
          <th>Total Rent</th>
          <th>Living Arrangements</th>
          <th>Has Utilities?</th>
          <th>Is Subsidized?</th>
          <th>Is Single Parent</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.address }}</td>
          <td>{{ client.city }}</td>
          <td>{{client.state}}</td>
          <td>{{ client.county }}</td>
          <td>{{ client.zip }}</td>
          <td>{{ client.totalRent }}</td>
          <td>{{ client.livingArrangements }}</td>
          <td>{{ client.hasUtilities }}</td>
          <td>{{ client.isSubsidized }}</td>
          <td>{{client.isSingleparent }}</td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Contact</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Cell Number </th>
          <th>Other Numbers</th>
          <th>Personal Email</th>
          <th>Other Email</th>
          <th>Zip</th>
          <th>Language</th>
          <th>Ethnicity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.cellNum }}</td>
          <td>{{ client.otherNum }}</td>
          <td>{{client.personalEmail}}</td>
          <td>{{ client.otherEmail }}</td>
          <td>{{ client.maritalStatus }}</td>
          <td>{{ client.language }}</td>
          <td>{{ client.ethnicity }}</td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Education</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Attending School </th>
          <th>School</th>
          <th>Last Grade</th>
          <th>Has Graduated?</th>
          <th>Attending College</th>
          <th>Certifications</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.hasAttended }}</td>
          <td>{{ client.school }}</td>
          <td>{{client.lastGrade}}</td>
          <td>{{ client.hasGraduated }}</td>
          <td>{{ client.attendingAttendedCollege }}</td>
          <td>{{ client.certifications }}</td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Employment</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Employment Status</th>
          <th>Length of Employment (Years)</th>
          <th>Employer</th>
          <th>Occupation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.employmentStatus }}</td>
          <td>{{ client.lengthOfEmployment }}</td>
          <td>{{client.employer}}</td>
          <td>{{ client.occupation }}</td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Government Help</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Tanf?</th>
          <th>SSI?</th>
          <th>Unemployment Benfits?</th>
          <th>Social Security?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.tanf }}</td>
          <td>{{ client.ssi }}</td>
          <td>{{client.unemployment}}</td>
          <td>{{ client.socialSecurity }}</td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Health</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Health Insurance??</th>
          <th>Health Insurance Name</th>
          <th>Pregnant?</th>
          <th>Teen Parent?</th>
          <th>Delivery Month</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.hasHealthInsurance }}</td>
          <td>{{ client.healthInsuranceProgram }}</td>
          <td>{{client.isPregnancy}}</td>
          <td>{{ client.isTeenparent }}</td>
          <td>{{ client.deliveryMonth }}</td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
        </tr>
      </tbody>
    </table>

    <div><pre></pre></div>
    <h3 class="text-center">Income</h3>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Head of Household?</th>
          <th>Monthly Income</th>
          <th>Workers Compensation?</th>
          <th>Child Support</th>
          <th>Food Stamps?</th>
          <th>Food Stamps Reason</th>
          <th>Other Income</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in Clients" :key="client.clientID">
          <td>{{ client.isHeadOfHousehold }}</td>
          <td>{{ client.monthlyIncome }}</td>
          <td>{{client.workComp}}</td>
          <td>{{ client.childSupport }}</td>
          <td>{{ client.hasFoodStamps }}</td>
          <td>{{ client.foodStampsReason }}</td>
          <td>{{ client.otherIncome }}</td>
            <!--<button @click.prevent="deleteClient(client.clientID)" class="btn btn-danger mx-2">Delete</button>
          </td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    import axios from "axios";
    

    export default {
        data() {
            return {
                Clients: [],
                Activities: [],
                ExArray: [],
                Events: [],
                ClientsEvents: []
            }
        },
        // this is using created hook 
        created() {
           
           let apiURL = `http://localhost:3000/clients/client/sum/${this.$route.params.id}`;
           let apiURL2 =`http://localhost:3000/activities/`; 
           let apiURL3 = `http://localhost:3000/events/`;    

           //gets clients info from db
            axios.get(apiURL).then(res => {
                this.Clients = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            }),
            //gets events from db
            axios.get(apiURL3).then(res => {
                this.Events = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            }),
            //gets activites from db
            axios.get(apiURL2).then(res => {
                this.Activities = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            //gets activities that a client is participating in
            }).then(() =>
              axios.get(`http://localhost:3000/activities/activity/client/${this.$route.params.id}`).then(res => {
                  this.ExArray = res.data;
                  console.log(res.data);
              }).catch(error => {
                  console.log(error)
                
            })),

            axios.get(`http://localhost:3000/events/client/${this.$route.params.id}`).then(res => {
                this.ClientsEvents = res.data;
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteActivity(id){
                let apiURL = `http://localhost:3000/activities/remove/attending/${id}/${this.$route.params.id}`;
                let indexOfArrayItem = this.ExArray.findIndex(i => i.activityID === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.put(apiURL).then(() => {
                        this.ExArray.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },

            deleteEvent(id){
                let apiURL = `http://localhost:3000/events/remove/attending/${id}/${this.$route.params.id}`;
                let indexOfArrayItem = this.ClientsEvents.findIndex(i => i.eventID === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.put(apiURL).then(() => {
                        this.ClientsEvents.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },

            addAct(id){
              var cli = this.Clients[0].clientID
              let apiURL =`http://localhost:3000/clients/update/activities/${cli}/${id}`;
              //PART of the key make a change without reloading but not working rn
              //let indexOfArrayItem = this.ExArray.findIndex(i => i.activityID === id);
              axios.put(apiURL).then(res => {
                //PART of the key make a change without reloading but not working rn
                //this.ExArray.slice(indexOfArrayItem, 1);
                  console.log(res.data);
                }).catch(error => {
                  console.log(error)
                }).then(() =>
                  axios.put(`http://localhost:3000/activities/update/attending/${id}/${cli}`).then(res2 => {
                    window.location.reload();
                    console.log(res2.data);
                  }).catch(error => {
                      console.log(error)
              }));
            },
            addEvent(id){
              axios.put(`http://localhost:3000/clients/update/events/${this.$route.params.id}/${id}`).then(res => {
                  console.log(res.data);
                }).catch(error => {
                  console.log(error)
                }).then(() =>
                  axios.put(`http://localhost:3000/events/update/attending/${id}/${this.$route.params.id}`).then(res2 => {
                    window.location.reload();
                    console.log(res2.data);
                  }).catch(error => {
                      console.log(error)
              }));
            }
        }
    }
</script>