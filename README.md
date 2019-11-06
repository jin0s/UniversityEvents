## Table of Contents
1. [ Quick Start ](#QuickStart)
2. [ DBS Connection ](#DBSConnection)
3. [ API WRITEUP ](#ApiWriteup)
4. [ App Info ](#AppInfo)
- - - -
<a name="QuickStart"></a>
## Quick Start

``` bash
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
- - - -
<a name="DBSConnection"></a>
## DBS Connection
For some reason the MySQL wont support password protocol by default so we will have to modify the user previledges. Run the following query.
```sql
CREATE USER 'dev'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```
- - - -
<a name="ApiWriteup"></a>
## API WRITEUP
1. [ Signup ](#Signup)
2. [ Login ](#Login)
3. [ Events ](#Events)
    1. [ Create Events ](#CreateEvents)
    2. [ Get List of All Available Events ](#GetAllEvents)
    3. [ Modify Event ](#ModifyEvent)
4. [ RSO ](#RSO)
    1. [ Get List of RSOs ](#GetAllRSOs)
    2. [ Join RSO ](#JoinRSO)
    3. [ Create RSO ](#CreateRSO)
5. [ Universities ](#Universities)
    1. [ Create Universitiess ](#CreateUniversities)
6. [ Admins ](#Admins)
    1. [ Create Admins ](#CreateAdmins)
7. [ Super Admins ](#SuperAdmins)
    1. [ Assign Super Admins ](#AssignSuperAdmins)
    2. [ Get SuperAdmin ById ](#GetSuperAdminById)

<a name="Signup"></a>
### Signup
**/api/signup**

*Expects*
  ```
  {
    "username": "example@knights.ucf.edu",
    "password" : "123456",
    "name" : "test"
  }
  ```
*Returns*

On Success: 

  ```
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

*Expects*
  ```
  {
    "username": "example",
    "inputPassword" : "12345"
  }
  ```
*Returns*

On Success: 

  ```
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
**/api/**

*Expects*
  ```
  {
    "event_type_id": "1",
    "name" : "antisocial social event",
    "datetime" : "2019-10-29 12:00:00",
    "description" : "Anti Social Social Club (sometimes stylized as ASSC and AntiSocialSocialClub) is a streetwear brand founded by Neek Lurk,[1][2] who previously worked for Stussy as a social marketing manager..[3][4]The brand has collaborated with A Bathing Ape,[5] Dover Street Market,[6], Playboy,[7][8] and Hello Kitty.[9]",
    "contact_phone": "4075555050",
    "contact_email": "test@knights.ucf.edu" 
  }
  ```
*Returns*

On Success: 

  ```
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
*Expects*
```json
{
    "username": "c.le93@knights.ucf.edu",
    "accesstoken" : "22",
    "event_type" : "rso/private/public"
}
```
*Returns*

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

<a name="ModifyEvent"></a>
#### Modify Event
**/api/**


<a name="RSO"></a>
### RSO

<a name="GetAllRSOs"></a>
#### Get List of RSOs
**/api/**

<a name="JoinRSO"></a>
#### Join RSO
**/api/**

<a name="CreateRSO"></a>
#### Create RSO
**/api/create_rso**
*Expects*
  ```
  {
    "admin_id" : "userid1",
    "user_id1" : "userid2",
    "user_id2" : "userid3",
    "user_id3" : "userid4",
    "user_id4" : "userid5",
    "name" : "RSONameClubYea"
  }
  ```
*Returns*

On Success: 

  ```
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
*Expects*
  ```
  {
    "id": "12345",
    "super_user_id" : "userid1",
    "name": "example",
    "pictures" : "pic_url",
    "location_address": "example",
    "num_of_students": "1000"
  }
  ```
*Returns*

On Success: 

  ```
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

<a name="CreateAdmins"></a>
#### Create Admins
**/api/create_adminss**
*Expects*
  ```
  {
    "user_id": "userid1",
    "university_id" : "12345",
  }
  ```
*Returns*

On Success: 

  ```
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

<a name="SuperAdmins"></a>
### Super Admins

<a name="AssignSuperAdmins"></a>
#### Assign Super Admins
**/api/assign_super_admins**
*Expects*
  ```
  {
    "user_id": "userid1",
  }
  ```
*Returns*

On Success: 

  ```
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
 
 
<a name="GetSuperAdminById"></a>
#### Get Super Admin By Id
**/api/getSuperAdminById**
*Expects*
  ```
  {
    "user_id": "userid1",
  }
  ```
*Returns*

On Success: 

  ```
  {
    "user_id": "userid1"
  }
  ```
Otherwise:
 ```
  {
    "status": "ERRORED"
  }
 ```
 
- - - -

<a name="AppInfo"></a>
## App Info

### Author

Jin Le  
Jiayi Zhang

### Version

1.0.0
