## Table of Contents

1. [ Quick Start ](#QuickStart)
2. [ DBS Connection ](#DBSConnection)
3. [ API WRITEUP ](#ApiWriteup)
4. [ App Info ](#AppInfo)

---

<a name="QuickStart"></a>

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

---

<a name="DBSConnection"></a>

## DBS Connection

For some reason the MySQL wont support password protocol by default so we will have to modify the user previledges. Run the following query.

```sql
CREATE USER 'dev'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

---

<a name="ApiWriteup"></a>

## API WRITEUP

1. [ Signup ](#Signup)
2. [ Login ](#Login)
3. [ Events ](#Events)
   1. [ Create Events ](#CreateEvents)
   2. [ Get List of All Available Events ](#GetAllEvents)
   3. [ Get All User Events ](#GetAllUserEvents)
   4. [ Get Public Events By University](#GetEventsByUni)
   5. [ Get Events By ID ](#GetEventsByID)
   6. [ Get Event Category List](#GetEventCategoriesList)
   7. [ Modify Event ](#ModifyEvent)
4. [ RSO ](#RSO)
   1. [ Get List of RSOs Avaiable To User](#GetAllRSOs)
   2. [ Get RSOs by Id](#GetRSOsByID)
   3. [ Join RSO ](#JoinRSO)
   4. [ Create RSO ](#CreateRSO)
5. [ Universities ](#Universities)
   1. [ Create Universitiess ](#CreateUniversities)
6. [ Admins ](#Admins)
   1. [ Create Admins ](#CreateAdmins)
   2. [ Change Admins ](#ChangeAdmin)
7. [ Super Admins ](#SuperAdmins)
   1. [ Assign Super Admins ](#AssignSuperAdmins)
   2. [ Get SuperAdmin ById ](#GetSuperAdminById)
8. [ Comments ](#Comments)
   1. [ Add a comment and rating to an event ](#Comment)

<a name="Signup"></a>

### Signup

**/api/signup**

_Expects_

```json
{
  "username": "example@knights.ucf.edu",
  "password": "123456",
  "name": "test"
}
```

_Returns_

On Success:

```json
{
  "status": "0"
}
```

Otherwise:

```
 {
   "status": "ERRORED"
 }
```

<a name="Login"></a>

### Login

**/api/login**

_Expects_

```json
{
  "username": "example",
  "inputPassword": "12345"
}
```

_Returns_

On Success:

```json
{
  "status": "0"
}
```

Otherwise:

```
 {
   "status": "1"
 }
```

<a name="Events"></a>

### Events

<a name="CreateEvents"></a>

#### Create Events

**/api/create_event**

_Expects_
If the event is private or public, you do not need to pass it an RSO ID.
If the event is an RSO event you will need to pass it an RSO ID

```json
{
  "event_category": "1",
  "name": "antisocial social event",
  "datetime": "2019-10-29 12:00:00",
  "description": "Anti Social Social Club (sometimes stylized as ASSC and AntiSocialSocialClub) is a streetwear brand founded by Neek Lurk,[1][2] who previously worked for Stussy as a social marketing manager..[3][4]The brand has collaborated with A Bathing Ape,[5] Dover Street Market,[6], Playboy,[7][8] and Hello Kitty.[9]",
  "contact_phone": "4075555050",
  "contact_email": "test@knights.ucf.edu",
  "admin_id": "admin@knights.ucf.edu",
  "rso_id": "1",
  "event_type": "public/private/rso"
}
```

_Returns_

On Success:

```json
{
  "status": "0"
}
```

Otherwise:

```
 {
   "status": "ERRORED"
 }
```

<a name="GetAllUserEvents"></a>

#### Get List of All Available Events For The User

**/api/event**
_Expects_

```json
{
  "username": "c.le93@knights.ucf.edu",
  "accesstoken": "22",
  "event_type": "rso/private/public"
}
```

_Returns_

On Success:

```json
{
  "username": "c.le93@knights.ucf.edu",
  "event_type": "rso",
  "results": [
    [
      {
        "students": "c.le93@knights.ucf.edu",
        "id": 1,
        "name": "antisocial social event",
        "datetime": "2019-10-29T16:00:00.000Z",
        "description": "Anti Social Social Club (sometimes stylized as ASSC and AntiSocialSocialClub) is a streetwear brand founded by Neek Lurk,[1][2] who previously worked for Stussy as a social marketing manager..[3][4]The brand has collaborated with A Bathing Ape,[5] Dover Street Market,[6], Playboy,[7][8] and Hello Kitty.[9]",
        "contact_phone": "4075555050",
        "contact_email": "test@knights.ucf.edu",
        "event_type": "Social",
        "event_id": 1,
        "RSO_id": 1
      }
    ],
    {
      "fieldCount": 0,
      "affectedRows": 0,
      "insertId": 0,
      "info": "",
      "serverStatus": 2,
      "warningStatus": 0
    }
  ]
}
```

On Zero Result:

```json
{
  "username": "c.le93@knights.ucf.edu",
  "event_type": "",
  "results": "No results"
}
```

On Error:

```json
{
  "status": "ERRORED"
}
```

<a name="GetEventsByUni"></a>

#### Get List of Public Events By University

**/api/event**
_Expects_

```
METHOD: GET
/api/events/?uni=1
```

_Returns_

On Success:

```json

```

<a name="GetEventsByID"></a>

#### Get Details of Events by ID

**/api/event**
_Expects_

```
METHOD: GET
/api/events/?id=1
```

_Returns_

On Success:

```json
[
  {
    "id": 1,
    "event_type_id": 1,
    "name": "antisocial social event",
    "datetime": "2019-10-29T16:00:00.000Z",
    "description": "Anti Social Social Club (sometimes stylized as ASSC and AntiSocialSocialClub) is a streetwear brand founded by Neek Lurk,[1][2] who previously worked for Stussy as a social marketing manager..[3][4]The brand has collaborated with A Bathing Ape,[5] Dover Street Market,[6], Playboy,[7][8] and Hello Kitty.[9]",
    "contact_phone": "4075555050",
    "contact_email": "test@knights.ucf.edu"
  }
]
```

<a name="GetEventCategoriesList"></a>

#### Get List Of Event Category

**/api/event**

_Expects_

```
METHOD: GET
/api/events_categories
```

_Returns_

On Success:

```json
[
  { "id": 1, "name": "Social" },
  { "id": 2, "name": "Fundraiser" },
  { "id": 3, "name": "Informational" },
  { "id": 4, "name": "General Body Meeting" },
  { "id": 5, "name": "Networking" }
]
```

<a name="ModifyEvent"></a>

#### Modify Event

**/api/**

<a name="RSO"></a>

### RSO

<a name="GetAllRSOs"></a>

#### Get RSO Avaiable To The User

**/api/user_rso/?id=x**

_Expects_

```
METHOD GET:
/api/rsos/?user_id=userid@knights.ucf.edu

you can set id to any valid id values
```

_Returns_

```json
[
  [
    { "id": 1, "name": "Antisocial Social Club" },
    { "id": 2, "name": "RSOnameTest" },
    { "id": 3, "name": "PostMan Test" },
    { "id": 4, "name": "passuniid" },
    { "id": 6, "name": "testautocreateadmin" }
  ],
  {
    "fieldCount": 0,
    "affectedRows": 0,
    "insertId": 0,
    "info": "",
    "serverStatus": 34,
    "warningStatus": 0
  }
]
```

<a name="GetRSOsByID"></a>

#### Get RSO By ID

**/api/rsos/?id=x**

_Expects_

```
METHOD GET:
/api/rsos/?id=6

you can set id to any valid id values
```

_Returns_

```json
[
  {
    "id": 6,
    "user_id": "c.le93@knights.ucf.edu",
    "name": "testautocreateadmin",
    "status": 1
  }
]
```

<a name="JoinRSO"></a>

#### Join RSO

**/api/join_rso**

_Expects_
```json
{
  "user_id" : "userid@knights.ucf.edu",
  "rso_id" : "1",
}
```

_Returns_
```json
{
  "status": "0"
}
```

<a name="CreateRSO"></a>

#### Create RSO

**/api/create_rso**
_Expects_

```json
{
  "admin_id" : "userid1",
  "user_id1" : "userid2",
  "user_id2" : "userid3",
  "user_id3" : "userid4",
  "user_id4" : "userid5",
  "name" : "RSONameClubYea"
  "admin_university_id" : "(int) 1"
}
```

_Returns_

On Success: The API will auto assign the user to an admin role of the RSO on creation

```json
{
  "status": "0"
}
```

On failed to create because the atleast one of the students are not registered on the Users table. This does not tell you which of the inputs are wrong so make sure the username of the student is spelled correctly:

```
 {
   "status": "1"
 }
```

On failed to create because the admin is already associated with another university and is trying to create a new RSO under another university

```
 {
   "status": "2"
 }
```

On Error:

```
 {
   "status": "ERRORED"
 }
```

<a name="Universities"></a>

### Universities

<a name="CreateUniversities"></a>

#### Create Universities

**/api/create_universities**
_Expects_

```json
{
  "id": "12345",
  "super_user_id": "userid1",
  "name": "example",
  "pictures": "pic_url",
  "location_address": "example",
  "num_of_students": "1000"
}
```

_Returns_

On Success:

```json
{
  "status": "0"
}
```

Otherwise:

```
 {
   "status": "ERRORED"
 }
```

<a name="Admins"></a>

### Admins

<a name="GetRSOsByID"></a>

#### Get RSO By ID

**/api/rsos/?id=x**

_Expects_

```
METHOD GET:
/api/rsos/?id=6

you can set id to any valid id values
```

_Returns_

```json
[
  {
    "id": 6,
    "user_id": "c.le93@knights.ucf.edu",
    "name": "testautocreateadmin",
    "status": 1
  }
]
```

<a name="CreateAdmins"></a>

#### Create Admins

**/api/create_adminss**
_Expects_

```json
{
  "user_id": "userid1",
  "university_id": "12345"
}
```

_Returns_

On Success:

```json
{
  "status": "0"
}
```

Otherwise:

```json
{
  "status": "ERRORED"
}
```

<a name="ChangeAdmin"></a>

#### Change Admins

**/api/change_admin**
_Expects_
user_id is the person getting promoted to administrator
admin_id is the person who is giving up their role

```json
{
  "user_id": "userid1",
  "admin_id": "12345"
}
```

_Returns_

On Success:

```json
{
  "status": "0"
}
```

On Failure

```json
{
  "status": "ERRORED"
}
```

<a name="SuperAdmins"></a>

### Super Admins

<a name="AssignSuperAdmins"></a>

#### Assign Super Admins

**/api/assign_super_admins**
_Expects_

```json
{
  "user_id": "userid1"
}
```

_Returns_

On Success:

```json
{
  "status": "0"
}
```

Otherwise:

```json
{
  "status": "ERRORED"
}
```

<a name="GetSuperAdminById"></a>

#### Get Super Admin By Id

**/api/getSuperAdminById**
_Expects_

```json
{
  "user_id": "userid1"
}
```

_Returns_

On Success:

```json
{
  "user_id": "userid1"
}
```

Otherwise:

```json
{
  "status": "ERRORED"
}
```

<a name="Comment"></a>

#### Comment

**/api/comment**

_Expects_

```json
{
  "user_id": "userid@knights.ucf.edu",
  "event_id": "1",
  "description": "this is the comment description",
  "rating": "5"
}
```

_Returns_

On Success:

```json
{
  "status": 0
}
```

Otherwise:

```json
{
  "status": "ERRORED"
}
```

---

<a name="AppInfo"></a>

## App Info

### Author

Jin Le  
Jiayi Zhang

### Version

1.0.0
