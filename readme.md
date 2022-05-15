# 4339 Project Backend API
###### By Gabriel Daniels, Juan Gonzalez, Daniel Hernandez

## Overview
This is backend a consolidation of the two previous application solutions, Bread of LIfe and CFC, and we have, to the best of our abilities improved both upon them and introduced more functionality, that will hopefully benefit any organizaiton that utilzes it.

## Demo
https://user-images.githubusercontent.com/70462084/168494396-c476fca9-29c7-4f1f-bda8-e0e7b8f3ce43.mp4

## How to Run API

* Download Mongosh or MongoDB Compass (MongoDB Compass recommended) 

* Download Node.js

* Download Postman to test API endpoints

* Open project folder in IDE (VSCode recommended)

* Open MongoDB Compass and press connect 

    * The connection string should be "mongodb://127.0.0.1:27017/"

* Back in the project folder in the IDE:

    * In the env.save file, change the connection string to "mongodb://127.0.0.1:27017/{NAME OF DATABASE}"

        * This will make a database in MongoDB with the name of your choice

* In a terminal inside VSCode type code below and press enter:
```
npm install
```

* Type ```node backend/app.js```  in the terminal and press enter to start the API

* Use a browser or Postman to access endpoints


## Models and Routes

### 1. Activity
|Parameter |Type |Required? |Description |
| --------- | ----  | --------- | ---------- |
|_id |string |yes |necessary identifier for mongodb|
|activityID |num |yes |id used to identify the activity|
|program |string |yes |name of the program the client is involved with|
|short notes |string |no |notes about the client|
|datetime |string |yes |the date the client was signed up|
|timeSpend |number |yes |the amount of time in minutes the activity lasts|
|workerID |number |yes |id of the worker assigned to the activity|
|hasUsedServices |bool |no |bool (true of false) if the client has done the activity before|
|handlingStatus |string |no |reflects the staus of the activity (active, discontinued, on pause)|

#### 1.1 Endpoint that will insert an activity info into DB.

Link: http://127.0.0.1:3000/activities/
Postman must be in POST mode.

Please assign the activityID using the counter routes.

Body Input Format:
```
{
    "activityID": ,
    "program": "",
    "shortNotes": "" ,
    "datetime": "",
    "timeSpend": ,
    "workerID": ,
    "hasUsedServices": ,
    "handlingStatus": ""
}
```
Information need to be placed in JSON format in the body of postman.

Endpoint response (if successful): "Activity info is added to the database."
If not: Error

#### 1.2 Endpoint to get all activities - Summary page (viewed by supervisor).

Pulls all information stored in the db about the activity
Link: http://127.0.0.1:3000/activities/
Postman must be in GET mode.

#### 1.3 Endpoint to get all activities - Summary page (viewed by supervisor).

Pulls worker information related to the included employee id as well.
Link: http://127.0.0.1:3000/activities/summary
Postman must be in GET mode.

#### 1.4 Endpoint to retrieve all activities by program - Summary page (viewed by supervisor).

Pulls worker information related to the included employee id as well.
Link: http://127.0.0.1:3000/activities/summary-program/:program
Postman must be in GET mode.

":program" must be replaced with name of the program spcefied when the activity was created, syntax is important.

#### 1.5 Endpoint to retrieve all activities by event date - Summary page (viewed by supervisor).
Pulls worker information related to the included employee id as well.
Link: http://127.0.0.1:3000/activities/summary-datetime/:datetime
Postman must be in GET mode.

":datetime" must be replaced with date of the date specified when the activity was created, syntax is important.

#### 1.6 Endpoint to retrieve all activities by worker ID - Summary page (viewed by supervisor).

Pulls worker information related to the included employee id as well.
Link: http://127.0.0.1:3000/activities/summary-worker/:id
Postman must be in GET mode.

":id" must be replaced with the id of the worker specified when the activity was created, syntax is important.

#### 1.7 Endpoint to edit a activity record by _id.

Replace the ":id" with the _id of the specific activity you want to update.
Postman must be in PUT mode.
Specify the field(s) you want to update and include the new value.

Body Input Format:
```
{
    "program": "",
    "shortNotes": "" ,
    "datetime": "",
    "timeSpend": ,
    "workerID": ,
    "hasUsedServices": ,
    "handlingStatus": ""
}
```
You do not need all fields to update.

#### 1.8 Endpoint to delete a activity record by _id

Replace the ":id" with the _id of the specific activity you want to update.
Link: http://127.0.0.1:3000/activities/:id
Postman must be in DELETE mode.
</details>

### 2. Client
|Parameter |Type |Required? |Description |
| --------- | ----  | --------- | ----------
|_id |string |yes |necessary identifier for mongodb|
|clientID |number |yes |identifier used to connect client to its related schemas|
|lastName |string |yes |last name of client|
|firstName |string |yes |first name of client|
|middleInitial |string |no |middle initial of client|
|orgID |number |yes |id of the organization the client is from|
|eventID |number |no |id of the event the client is/may be attending|
|activityID |number |no |id of the activity the client is/may be attending|
|birthday |string |yes |birthdate of the client|
|ssn |string |yes |social security number of the client|
|isVeteran |string |yes |says if client is a veteran or not|
|is65orOlder |string |yes |is client above the age of 65|
|isVaccinated |string |no |client can say if theyre vaccinated or not|
|gender |string |yes |gender of the client|
|driverLicense |string |yes |drivers license # of the client|
|modifyAt |date |yes |date the information was modified/created|

#### 2.1 Endpoint that will insert client info into a DB.

Link: http://127.0.0.1:3000/clients/
Postman must be in POST mode.

Clientid can be obtained by following the counter methods (found lower).
Please follow the routes there

Body Input Format:
```
    "clientID": ,
    "lastName": "",
    "firstName": "",
    "middleInitial": "",
    "orgID": ,
    "eventID": ,
    "activityID": ,
    "birthday": "",
    "ssn": "",
    "isVeteran": "",
    "is65orOlder": "",
    "isVaccinated": "",
    "gender": "",
    "driverLicense": "",
    "modifyAt": "" 
```
Information need to be placed in JSON format in the body of postman.

Endpoint response (if successful): "Client info is added to the database."
If not: Error

#### 2.2 Endpoint to retrieve specific client by client ID.

Link: http://127.0.0.1:3000/clients/:id
Postman must be in GET mode.

":id" must be replaced with the clienID of the specified client.

#### 2.3 Endpoint to edit a client record by clientid.

Link: http://127.0.0.1:3000/clients/:id
Postman must be in PUT mode.

":id" must be replaced with the id of the client specified.

Specify the field(s) you want to update and include the new value.
```
    "clientID": ,
    "lastName": "",
    "firstName": "",
    "middleInitial": "",
    "orgID": ,
    "eventID": ,
    "activityID": ,
    "birthday": "",
    "ssn": "",
    "isVeteran": "",
    "is65orOlder": "",
    "isVaccinated": "",
    "gender": "",
    "driverLicense": "",
    "modifyAt": "" 
```
You do not need all fields to update.

#### 2.4 Endpoint to get all clients from the API.

Link: http://127.0.0.1:3000/clients/
Postman must be in GET mode.

#### 2.5 Endpoint to retrieve client by client last name.

Link: http://127.0.0.1:3000/clients/lastname/:lastName
Postman must be in GET mode.

":lastName" must be replaced with the last name of the client you want to pull up.

#### 2.6 Endpoint to retrieve client by that participate in the specified activity by their activityID.

Link: http://127.0.0.1:3000/clients/activity/:activityID
Postman must be in GET mode.

":activityID" must be replaced with the activityID (activityID) the client you want to pull up participates in.

#### 2.7 Endpoint to retrieve client by that participate in the specified event by their eventID.

Link: http://127.0.0.1:3000/clients/event/:eventID
Postman must be in GET mode.

":eventID" must be replaced with the eventID (eventID) the client you want to pull up participates in.

#### 2.8 Endpoint to get all clients edit history from the API.

Link: http://127.0.0.1:3000/clients/history/:id
Postman must be in GET mode.

":id" must be replaced with the id (clientID) of the client you want to pull up.

#### 2.9 Endpoint to delete a client by client ID and modify time.

Link: http://127.0.0.1:3000/clients/:id
Postman must be in DELETE mode.

":id" must be replaced with the id (clientID) of the client you want to delete.

### 3. Contact
|Parameter |Type |Required? |Description |
| --------- | ----  | --------- | ----------
|_id |string |yes |necessary identifier for mongodb|
|clientID |number |yes |identifier used to connect client to its related schemas|
|cellNum |string |yes |phone number of the client|
|otherNum |string |no |other phone number client may have|
|personalEmail |string |yes |client's email|
|otherEmail |string |no |secondary email the client may have|
|maritalStatus |string |yes |is the client marries|
|language |string |yes |prefferred language of client|
|ethnicity |string |yes |ethnicity of the client|
|priorityPopulation |string |yes |shared objectives and characteristics within the peer community|
|isPregnancy |bool |yes |is the client pregnant?|
|isTeenParent |bool |yes |is the client a teen and pregnant?|
|deliveryMonth |number |no |delivery month of the expected|
|modifyAt |date |yes |date the information was modified/created|

#### 3.1 Endpoint that will insert a client contact info into DB.

Link: http://127.0.0.1:3000/contacts/
Postman must be in POST mode.

Body Input Format:
```
{
    "clientID": ,
    "cellNum": "",
    "otherNum": "",
    "personalEmail": "",
    "otherEmail": "",
    "maritalStatus": "",
    "language": "",
    "ethnicity": "",
    "priorityPopulation": "",
    "isPregnancy": ,
    "isTeenParent": ,
    "deliveryMonth": ,
    "modifyAt": ""
}
```

Information need to be placed in JSON format in the body of postman.

Endpoint response (if successful): "Contact info is added to the database."
If not: Error

#### 3.2 Endpoint to get all clients contact info from the API.

Link: http://127.0.0.1:3000/contacts/
Postman must be in GET mode.

#### 3.3 Endpoint to retrieve specific client contact info by client ID.

Link: http://127.0.0.1:3000/contacts/:id
Postman must be in GET mode.

":id" must be replaced with the the client id (clientID) of the specified client

#### 3.4 Endpoint to get all client contact edit history from the API.

Link: http://127.0.0.1:3000/contacts/history/:id
Postman must be in GET mode.

":id" must be replaced with the the client id (clientID) of the specified client

#### 3.5 Endpoint to edit a contact record by clientid.

Link: http://127.0.0.1:3000/contacts/:id
Postman must be in PUT mode.

":id" must be replaced with the the client id (clientID) of the specified client

Include (only) the field(s) you want to update.
```
{
    "clientID": ,
    "cellNum": "",
    "otherNum": "",
    "personalEmail": "",
    "otherEmail": "",
    "maritalStatus": "",
    "language": "",
    "ethnicity": "",
    "priorityPopulation": "",
    "isPregnancy": ,
    "isTeenParent": ,
    "deliveryMonth": ,
    "modifyAt": ""
}
```

#### 3.6 Endpoint to delete a client contact record by client ID.

Link: http://127.0.0.1:3000/contacts/:id
Postman must be in DELETE mode.

":id" must be replaced with the client id (clientID) of the specified client

### 4. Counter
|Parameter |Type |Required? |Description |
| --------- | ----  | --------- | ----------
|_id |string |yes |necessary identifier for mongodb|
|seq |number |yes | number of the sequence, used for id assignment|

#### 4.1 Endpoint that will add a counter instant for client ID.

Link: http://127.0.0.1:3000/counters/
Postman must be in POST mode.

Please enter a number to get the counter started and give it a name.

Body Input Format:
```
{
    "_id": ,
    "seq": 
}
```

Information need to be placed in JSON format in the body of postman.

Endpoint response (if successful): "Counter is added to the database."
If not: Error

#### 4.2 Endpoint to gett all sequence/counter.

Link: http://127.0.0.1:3000/counters/
Postman must be in GET mode.

#### 4.3 Endpoint to get the current sequence/counter number.

Link: http://127.0.0.1:3000/counters/:seqName
Postman must be in GET mode.

":seqName" must be replaced with the name of the sequence you want to get the current count of.

#### 4.4 Endpoint to check if the sequence exist.

Link: http://127.0.0.1:3000/counters/find/:seqName
Postman must be in GET mode.

":seqName" must be replaced with the name of the sequence you want to check.

#### 4.5 Endpoint to update the sequence/counter to the next number.

Link: http://127.0.0.1:3000/counters/:seqName
Postman must be in PUT mode.

":seqName" must be replaced with the name of the sequence you want to update.

This route increase the number of the sequence, do this before every time you create a client/activity/org/event.

### 5. Education
|Parameter |Type |Required? |Description |
| --------- | ----  | --------- | ----------
|_id |string |yes |necessary identifier for mongodb|
|clientID |number |yes |identifier used to connect client to its related schemas|
|hasAttended |bool |yes |has the client attended high school?|
|school |string |no |name of the high school|
|lastGrade |string |no |last letter grade they received|
|hasGraduated |bool |yes |have they graduated high school?|
|attendingAttendedCollege |string |no |have they attended or currently attending college?|
|certifications |string |no |professional certifications they may have|
| modifyAt | date | yes | Dates the field(s) when modified|

#### 5.1 Endpoint that will insert a client education info into DB.

Link: http://127.0.0.1:3000/educations/
Postman must be in POST mode.

Please enter a number to get the counter started and give it a name.

Body Input Format:
```
{
    "clientID": ,
    "hasAttended": ,
    "school": "",
    "lastGrade": ,
    "hasGraduated": ,
    "attendingAttendedCollege: "",
    "certifications": "",
    "modifyAt": "" 
}
```

Information need to be placed in JSON format in the body of postman.

Endpoint response (if successful): "Education information is added to the database."
If not: Error

#### 5.2 Endpoint to get all clients education info from the API.

Link: http://127.0.0.1:3000/educations/
Postman must be in GET mode.

#### 5.3 Endpoint to retrieve specific client education info by client ID.

Link: http://127.0.0.1:3000/educations/:id
Postman must be in GET mode.

":id" must be replaced with the id (clientID) of the client you want to get the current education info of.

#### 5.4 Endpoint to get all client education edit history from the API.

Link: http://127.0.0.1:3000/educations/history/:id
Postman must be in GET mode.

":id" must be replaced with the id (clientID) of the client you want to get the current education info of.

#### 5.5 Endpoint to edit a  record by clientid.

Link: http://127.0.0.1:3000/educations/:id
Postman must be in PUT mode.

":id" must be replaced with the id (clientID) of the client you want to edit the current education info of.

Please only insert the fields you want to change, not all are neccessary.
```
{
    "clientID": ,
    "hasAttended": ,
    "school": "",
    "lastGrade": ,
    "hasGraduated": ,
    "attendingAttendedCollege: "",
    "certifications": "",
    "modifyAt": "" 
}
```

#### 5.6 Endpoint to delete a client education record by client ID.

Link: http://127.0.0.1:3000/educations/:id
Postman must be in DELETE mode.

":id" must be replaced with the id (clientID) of the client you want to delete the current education info of.

### 6. Employment
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | Necessary identifier for MongoDB
| clientID | number  | yes | Identifier used to connect client to its related schemas
| employmentStatus | string |  yes | Displays client employment status
| length | number | yes | Displays the length of employment (years)
| employer | string | no | Displays the employer information
| occupation | string | no | Displays client's occupation
| modifyAt | date | yes | Date the field(s) where modified

#### 6.1 Endpoint that inserts client employment info into a DB.

Link: http://127.0.0.1:3000/employments/
Postman must be in POST mode.

Body Input Format: 
```
{
    "clientID": ,
    "employmentStatus": "",
    "length": ,
    "employer": "",
    "occupation": "",
    "modifyAt": ""
}
```

Information need to be placed in JSON format in the body of postman.

Endpoint response (if successful): "Employment information is added to the database."
If not: Error

#### 6.2 Endpoint to get all client employment info from the API.

Link: http://127.0.0.1:3000/employments/
Postman must be in GET mode.

#### 6.3 Endpoint to retrieve specific client employment info by client ID.

Link: http://127.0.0.1:3000/employments/:id
Postman must be in GET mode.

":id" must be replaced with the id (clientID) of the client you want to get the current employment info of.

#### 6.4 Endpoint to get all client employment edit history from the API.

Link: http://127.0.0.1:3000/employments/history/:id
Postman must be in GET mode.

":id" must be replaced with the id (clientID) of the client you want to get the history of the current employment info of.

#### 6.5 Endpoint to edit a employment record by clientid.

Link: http://127.0.0.1:3000/employments/:id
Postman must be in PUT mode.

":id" must be replaced with the id (clientID) of the client you want to edit the current employment info of.

Please only insert the fields you want to change, not all are neccessary.
```
{
    "clientID": ,
    "employmentStatus": "",
    "length": ,
    "employer": "",
    "occupation": "",
    "modifyAt": ""
}
```
#### 6.6 Endpoint to delete a client employment record by client ID.

Link: http://127.0.0.1:3000/employments/:id
Postman must be in DELETE mode.

":id" must be replaced with the id (clientID) of the client you want to delete the current employment info of.


### 7. Event
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | Necessary identifier for MongoDB
| eventID | number  | yes | Identifier used to connect event to its related schemas
| eventDescription | string |  no | Displays a description of an event
| eventDate | date | no | Displays the date of the event
| eventAddress | string | no | Displays the address of the event
| eventZip | number | no | Displays the zipcode of the event's address
| modifyAt | date | yes | Date the field(s) were modified

#### 7.1 Endpoint that will insert event info into a DB.

Link: http://127.0.0.1:3000/events/
Postman must be in POST mode.

Body Input Format: 
```
{
    "eventID": ,
    "eventDescription": "",
    "eventDate": "",
    "eventAddress": "",
    "eventZip": ,
    "modifyAt": ""
}
```

Information need to be placed in JSON format in the body of postman.

Endpoint response (if successful): "Event information is added to the database."
If not: Error

#### 7.2 Endpoint to get all events from the API.

Link: http://127.0.0.1:3000/events/
Postman must be in GET mode.

#### 7.3 Endpoint to retrieve specific event by event ID.

Link: http://127.0.0.1:3000/events/:id
Postman must be in GET mode.

":id" must be replaced with the id (eventID) of the event you want to get the current info of.

#### 7.4 Endpoint to retrieve event by eventDate.

Link: http://127.0.0.1:3000/events/eventDate/:eventDate
Postman must be in GET mode.

":eventDate" must be replaced with the date of the event you want to get the current info of.

#### 7.5 Endpoint to get all events edit history from the API.

Link: http://127.0.0.1:3000/events/history/:id
Postman must be in GET mode.

":id" must be replaced with the id (eventID) of the event you want to get the current info history of.

#### 7.6 Endpoint to edit a event record by eventid.

Link: http://127.0.0.1:3000/events/:id
Postman must be in PUT mode.

":id" must be replaced with the id (eventID) of the event you want to get the current info history of.

Please only insert the fields you want to change, not all are neccessary.
```
{
    "eventID": ,
    "eventDescription": "",
    "eventDate": "",
    "eventAddress": "",
    "eventZip": ,
    "modifyAt": ""
}
```

#### 7.7 Endpoint to delete a event by event ID and modify time.

Link: http://127.0.0.1:3000/events/:id
Postman must be in DELETE mode.

":id" must be replaced with the id (eventID) of the event you want to get the current info history of.

### 8. Family
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | Necessary identifier for MongoDB
| clientID | number  | yes | Identifier used to connect client to its related schemas
| familyMember | string |  no | Displays family member information
| firstName | string | yes | Displays family member's last name
| gender | string | yes | Displays family member's gender
| birthday | string | yes | Displays family member's birthday
| age | number | yes | Displays family member's age
| relation | string | yes | Displays family member's relation to client
| race | string | yes | Displays family member's race
| pregnant | boolean | yes | If applicable, displays if family member is pregnant 
| whereWorkOrStudy | string | yes | Displays family member's work or study status
| occupationOrGrade | string | yes | Displays family member's occupation or school grade

#### 8.1 Endpoint that will insert family info into a DB.

Link: http://127.0.0.1:3000/families/
Postman must be in POST mode.

Body Input Format:
```
{
    "clientID": ,
    "familyMember": "",
    "firstName": "",
    "gender": "",
    "birthday": "",
    "age": ,
    "relation": "",
    "race": "",
    "pregnant": ,
    "whereWorkOrStudy": "" ,
    "occupationOrGrade": ""
}
```
Information needs to be placed in json format in the body of postman.

Endpoint response (if successful): "Family member info is added to the database."
If not: Error

#### 8.2 Endpoint to retrieve all family info.

Link: http://127.0.0.1:3000/families/
Postman must be in GET mode.

Endpoint response (if successful) will be in json format and show all the information about family info in the db.
If not: Error

#### 8.3 Endpoint to retrieve specific family info by client ID.

Link: http://127.0.0.1:3000/families/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about family info in the db based on the clientID.
If there is no data: "Family member info not found"

#### 8.4 Endpoint to add family member into list by client ID.

Link: http://127.0.0.1:3000/families/add-member/:id
Postman must be in PUT mode and ':id' is simply the id of the client.

Body Input Format:
```
{
    "clientID": ,
    "familyMember": "",
    "firstName": "",
    "gender": "",
    "birthday": "",
    "age": ,
    "relation": "",
    "race": "",
    "pregnant": ,
    "whereWorkOrStudy": "" ,
    "occupationOrGrade": ""
}
```
Information needs to be placed in json format in the body of postman.

Endpoint response (if successful): "Family member is added via PUT."
If not: Error

#### 8.5 Endpoint to delete a family member from list by client ID.

Link: http://127.0.0.1:3000/families/delete-member/:clientID/:memberID
Postman must be in DELETE mode and ':clientid' is simply the clientID of the client, and ':memberID' is simply the family memberID of the family member.

Endpoint response (if successful): "Family member is deleted via PUT."
If there is no data: Error

#### 8.6 Endpoint to edit a family record by clientid.

Link: http://127.0.0.1:3000/families/:id
Postman must be in PUT mode and ':id' is simply the id of the client.

Body Input Format:
```
{
    "clientID": ,
    "familyMember": "",
    "firstName": "",
    "gender": "",
    "birthday": "",
    "age": ,
    "relation": "",
    "race": "",
    "pregnant": ,
    "whereWorkOrStudy": "" ,
    "occupationOrGrade": ""
}
```
Not EVERY field is necessary, just the ones that need to change.

Endpoint response (if successful): "Family member is edited via PUT."
If not: Error

#### 8.7 Endpoint to delete family member record by client ID.

Link: http://127.0.0.1:3000/families/:id
Postman must be in DELETE mode and ':id' is simply the clientID of the client.

Endpoint response (if successful) will be jsonified output of the record that was deleted.
If there is no data: Error

### 9. Government Help
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | necessary identifier for MongoDB
| clientID | number  | yes | unique identifier for a client
| tanf | string  | no | assistance received through TANF
| ssi | number  | no | assistance received through SSI
| unemployment | string  | no | assistance received through unemployment
| socialSecurity | string  | no | assistance received through social security
| modifyAt | date  | yes | date the field(s) were modified

#### 9.1 Endpoint that will insert government help help info into a DB.

Link: http://127.0.0.1:3000/governmentHelp/
Postman must be in POST mode.

Body Input Format:
```
{
    "clientID": ,
    "tanf": "",
    "ssi": ,
    "unemployment": "",
    "socialSecurity": "",
    "modifyAt": 
}
```
Information needs to be placed in json format in the body of postman.

Endpoint response (if successful): "Governement Help info is added to the database."
If not: Error

#### 9.2 Endpoint to get all government help help info from the API.

Link: http://127.0.0.1:3000/governmentHelp/
Postman must be in GET mode.

Endpoint response (if successful) will be in json format and show all the information about health info in the db.
If not: Error

#### 9.3 Endpoint to retrieve specific government help info by client ID.

Link: http://127.0.0.1:3000/governmentHelp/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about government help info in the db based on the clientID.
If there is no data: "Client government help info not found"

#### 9.4 Endpoint to get all government help info edit history from the API.

Link: http://127.0.0.1:3000/governmentHelp/history/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about the edit history of the government health collection based on clientID.
If not: Error

#### 9.5 Endpoint to edit a government help record by clientid.

Link: http://127.0.0.1:3000/governmentHelp/:id
Postman must be in POST mode.

Body Input Format:
```
{
    "clientID": ,
    "tanf": "",
    "ssi": ,
    "unemployment": "",
    "socialSecurity": "",
    "modifyAt": 
}
```
Not EVERY field is necessary, just the ones that need to change.

Endpoint response (if successful): "Government help is edited via PUT."
If not: Error

#### 9.6 Endpoint to delete government help record by client ID.

Link: http://127.0.0.1:3000/governmentHelp/:id
Postman must be in DELETE mode and ':id' is simply the clientID of the client.

Endpoint response (if successful) will be jsonified output of the record that was deleted.
If there is no data: Error

### 10. Health
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | necessary identifier for MongoDB
| clientID | number  | yes | unique identifier for a client
| hasHealthInsurance | boolean  | yes | does the client have health insurance
| healthInsuranceProgram | string  | no | what kind of health insurance do they have
| hasFoodStamps | boolean  | yes | does the client use foodstamps
| foodStampsAmount | number  | no | how much do they get in foodstamps
| foodStampsReason | string  | no | official reason why they are they on foodstaps
| modifyAt | date  | yes | date the field(s) were modified

#### 10.1 Endpoint that will insert health insurance info into a DB.

Link: http://127.0.0.1:3000/healths/
Postman must be in POST mode.

Body Input Format:
```
{
    "clientID": ,
    "hasHealthInsurance": ,
    "healthInsuranceProgram": "",
    "hasFoodStamps": ,
    "foodStampsAmount": ,
    "foodStampsReason": "",
    "modifyAt": 
}
```
Information needs to be placed in json format in the body of postman.

Endpoint response (if successful): "Health info is added to the database."
If not: Error

#### 10.2 Endpoint to get all health insurance info from the API.

Link: http://127.0.0.1:3000/healths/
Postman must be in GET mode.

Endpoint response (if successful) will be in json format and show all the information about health info in the db.
If not: Error

#### 10.3 Endpoint to retrieve specific health insurance info by client ID.

Link: http://127.0.0.1:3000/healths/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about health info in the db based on the clientID.
If there is no data: "Client health info not found"

#### 10.4 Endpoint to get all health insurance info edit history from the API.

Link: http://127.0.0.1:3000/healths/history/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about the edit history of the healths collection based on clientID.
If not: Error

#### 10.5 Endpoint to edit a health record by client ID.

Link: http://127.0.0.1:3000/healths/:id
Postman must be in PUT mode.

Body Input Format:
```
{
    "clientID": ,
    "hasHealthInsurance": ,
    "healthInsuranceProgram": "",
    "hasFoodStamps": ,
    "foodStampsAmount": ,
    "foodStampsReason": "",
    "modifyAt": 
}
```
Not EVERY field is necessary, just the ones that need to change.

Endpoint response (if successful): "Health is edited via PUT."
If not: Error

#### 10.6 Endpoint to delete health insurance record by client ID.

Link: http://127.0.0.1:3000/healths/:id
Postman must be in DELETE mode and ':id' is simply the clientID of the client.

Endpoint response (if successful) will be jsonified output of the record that was deleted.
If there is no data: Error


### 11. Income
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | necessary identifier for MongoDB
| clientID | number  | yes | unique identifier for a client
| isHeadOfHousehold | boolean  | yes | date the field(s) were modified
| monthlyIncome | number  | yes | average monthly income of client
| workComp | number  | yes | any income made from workers comp
| childSupport | number  | yes | any income from child support
| otherIncome | number  | no | any other sources of income
| modifyAt | date  | yes | date the field(s) were modified

#### 11.1 Endpoint to insert client income info into DB

Link: http://127.0.0.1:3000/incomes/
Postman must be in POST mode.

Body Input Format:
```
{
    "clientID": ,
    "isHeadOfHousehold": ,
    "monthlyIncome": ,
    "workComp": ,
    "childSupport": ,
    "otherIncome": ,
    "modifyAt": 
}
```
Information needs to be placed in json format in the body of postman.

Endpoint response (if successful): "Client Income info is added to the database."
If not: Error

#### 11.2 Endpoint to retrieve all client's income info from the DB.

Link: http://127.0.0.1:3000/incomes/
Postman must be in GET mode.

Endpoint response (if successful) will be in json format and show all the information about incomes in the db.
If not: Error

#### 11.3 Endpoint to retrieve specific client income info by client ID.

Link: http://127.0.0.1:3000/incomes/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about the incomes based on clientID.
If there is no data: "Client income info not found"

#### 11.4 Endpoint to get all client income edit history from the API.

Link: http://127.0.0.1:3000/incomes/history/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about the edit history of the income collection based on clientID.
If not: Error

#### 11.5 Endpoint to edit a income record by clientid.

Link: http://127.0.0.1:3000/incomes/:id
Postman must be in PUT mode.

Body Input Format:
```
{
    "clientID": ,
    "isHeadOfHousehold": ,
    "monthlyIncome": ,
    "workComp": ,
    "childSupport": ,
    "otherIncome": ,
    "modifyAt": 
}
```
Not EVERY field is necessary, just the ones that need to change.

Endpoint response (if successful): "Income is edited via PUT."
If not: Error

#### 11.6 Endpoint to delete a client income record by client ID.

Link: http://127.0.0.1:3000/incomes/:id
Postman must be in DELETE mode and ':id' is simply the clientID of the client.

Endpoint response (if successful) will be jsonified output of the record that was deleted.
If there is no data: Error


### 12. Organization
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | necessary identifier for MongoDB
| orgID | number  | yes | unique identifier for an organization
| orgName | string  | yes | name of organization
| clients | number  | no | number of clients in the organization
| modifyAt | date  | yes | date the field(s) were modified

#### 12.1 Endpoint that will insert organization info into DB.

Link: http://127.0.0.1:3000/orgs/
Postman must be in POST mode.

Body Input Format:
```
{
    "orgID": ,
    "orgName": "",
    "modifyAt": ""
}
```
Information needs to be placed in json format in the body of postman.

Endpoint response (if successful): "Organization info is added to the database."
If not: Error

#### 12.2 Endpoint to get all organization residence info.

Link: http://127.0.0.1:3000/orgs/
Postman must be in GET mode.

Endpoint response (if successful) will be in json format and show all the information about organizations in the db.
If not: Error

#### 12.3 Endpoint to retrieve specific organization info by org ID.

Link: http://127.0.0.1:3000/orgs/:id
Postman must be in GET mode and ':id' is simply the id of the org.

Endpoint response (if successful) will be in json format and show all the information about the organization based on orgID.
If there is no data: "Organization info not found"

#### 12.4 Endpoint to to get all org edit history from the API.

Link: http://127.0.0.1:3000/orgs/history/:id
Postman must be in GET mode and ':id' is simply the id of the org.

Endpoint response (if successful) will be in json format and show all the information about the edit history of the organization based on orgID.
If not: Error

#### 12.5 Endpoint to edit a org record by orgID.

Link: http://127.0.0.1:3000/orgs/:id
Postman must be in PUT mode and ':id' is simply the orgID of the org.

Body Input Format:
```
{
    "orgID": ,
    "orgName": "",
    "modifyAt": ""
}
```
Not EVERY field is necessary, just the ones that need to change.

Endpoint response (if successful): "Org info is edited via PUT."
If not: Error

#### 12.6 Endpoint to delete a specific org record by org ID.

Link: http://127.0.0.1:3000/orgs/:id
Postman must be in DELETE mode and ':id' is simply the orgID of the org.

Endpoint response (if successful) will be jsonified output of the record that was deleted.
If there is no data: Error

### 13. Residence
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | necessary identifier for MongoDB
| clientID | number  | yes | unique identifier for a c  lient
| address | string  | yes | street address of client
| city | string  | yes | city of address
| county | string  | yes | county of address
| zip | number  | yes | zipcode of address
| totalRent | number  | yes | total paid in rent
| livingArrangemets | string  | yes | the living situation of client (apt, house etc.)
| hasUtilities | boolean  | yes | does the client have utilities
| isSubsidized | boolean  | yes | is the housing subsidized
| isSingleParent | boolean  | yes | is the client a single parent
| modifyAt | date  | yes | date the field(s) were modified

#### 13.1 Endpoint that will insert residential info into DB.

Link: http://127.0.0.1:3000/residences/
Postman must be in POST mode.

Body Input Format:
```
{
    "clientID": ,
    "address": "",
    "city": "",
    "state": "",
    "county": "",
    "zip": ,
    "totalRent": ,
    "livingArrangemets": "",
    "hasUtilities": ,
    "isSubsidized": ,
    "isSingleParent": ,
    "modifyAt":  
}
```

Information needs to be placed in json format in the body of postman.

Endpoint response (if successful): "Residence info is added to the database."
If not: Error

#### 13.2 Endpoint to get all client residence info.

Link: http://127.0.0.1:3000/residences/
Postman must be in GET mode.

Endpoint response (if successful) will be in json format and show all the information about client residences in the db.
If not: Error

#### 13.3 Endpoint to retrieve specific client residence info by client ID.

Link: http://127.0.0.1:3000/residences/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about the client residences based on clientID.
If there is no data: "Client residence info not found"

#### 13.4 Endpoint to to get all client residence edit history from the API.

Link: http://127.0.0.1:3000/residences/history/:id
Postman must be in GET mode and ':id' is simply the id of the client.

Endpoint response (if successful) will be in json format and show all the information about the edit history of the residences collection based on clientID.
If there is no data: "Client residence info not found"

#### 13.5 Endpoint to edit a residence record by clientID.

Link: http://127.0.0.1:3000/residences/:id
Postman must be in PUT mode and ':id' is simply the clientID of the client.

Body Input Format:
```
{
    "clientID": ,
    "address": "",
    "city": "",
    "state": "",
    "county": "",
    "zip": ,
    "totalRent": ,
    "livingArrangemets": "",
    "hasUtilities": ,
    "isSubsidized": ,
    "isSingleParent": ,
    "modifyAt": 
}
```
Not EVERY field is necessary, just the ones that need to change.

Endpoint response (if successful): "Residence is edited via PUT." 
If there is no data: Error

#### 13.6 Endpoint to delete a specific residence record by client ID.

Link: http://127.0.0.1:3000/residences/:id
Postman must be in DELETE mode and ':id' is simply the clientID of the client.

Endpoint response (if successful) will be jsonified output of the record that was deleted.
If there is no data: Error


### 14. Worker
| Parameter | Type  | Required? | Description
| --------- | ----  | --------- | ----------
| _id    | string | yes | necessary identifier for MongoDB
| workerID | number  | yes | unique identifier for a client
| orgID | number  | yes | unique identifier for an organization
| role | string  | yes | role of worker in the organization
| firstName | string  | yes | first name of client
| lastName | string  | yes | last name of client

#### 14.1 Endpoint that will insert a worker info into DB.

Link: http://127.0.0.1:3000/workers/
Postman must be in POST mode.

Body Input Format:
```
{
    "workerID": ,
    "orgID": ,
    "role": "",
    "firstName": "",
    "lastName": ""
}
```

Information needs to be placed in json format in the body of postman.

Endpoint response (if successful): "Worker information is added to the database."
If not: Error

#### 14.2 Endpoint to get all worker info.

Link: http://127.0.0.1:3000/workers/
Postman must be in GET mode.

Endpoint response (if successful) will be in json format and show all the information about workers in the db.
If data is equal to null: "Worker information not found"

#### 14.3 Endpoint to retrieve specific worker info by work ID.

Link: http://127.0.0.1:3000/workers/:id
Postman must be in GET mode and ':id' is simply the id of the worker.

Endpoint response (if successful) will be in json format and show all the information about the worker based on workerID.
If there is no data: "Worker information not found"

#### 14.4 Endpoint to retrieve specific worker info by worker lastname.

Link: http://127.0.0.1:3000/workers/lastname/:lastname
Postman must be in GET mode and ':lastname' is simply the last name of the worker.

Endpoint response (if successful) will be in json format and show all the information about the worker based on their last name.
If there is no data: "Worker information not found"

#### 14.5 Endpoint to edit a worker record by worker ID.

Link: http://127.0.0.1:3000/workers/:id
Postman must be in PUT mode and ':id' is simply the workerID of the worker.

Body Input Format:
```
{
    "workerID": ,
    "orgID": ,
    "role": "",
    "firstName": "",
    "lastName": ""
}
```
Not EVERY field is necessary, just the ones that need to change.

Endpoint response (if successful): "Worker is edited via PUT" 
If there is no data: Error

#### 14.6 Endpoint to delete a worker record by worker ID.

Link: http://127.0.0.1:3000/workers/:id
Postman must be in DELETE mode and ':id' is simply the workerID of the worker.

Endpoint response (if successful): Code 200
If there is no data: Error
