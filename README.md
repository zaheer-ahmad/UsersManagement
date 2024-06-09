**UserManagement.API Overview**
 Backend project contains all the api to perform all crud opertions on users data. Following libraries used inside the application
 1- serilog to log and all application related logs
 2- asp.net identity to manage user with hash password data and roles
 

**Project Setup UserManagement.API**

  add connection db connection string in "appsettings.json" file of API project in serilog and connectionstring sections
  Run Entityframework Core Migration
  Run the trigger script from "TriggerScript" file
  call "AddFirstUser" request from postman collection attached to create first user of the application with "Admin" rolex
  add token from login request to access all only authroize APIs
  pass "Accept-Language" header with language option either "en-US" or "ar" to recieve message from backend according to langage

**UserManagement.Client Overview**
 Client project contains all the functions to listed down and perform curd operation on users data. Following libraries used inside the application
 1- bootstrap datatable to list down and filtering users data
 2- ngx-translate/core to support translation in arabic and english

**Project Setup UserManagement.Client**

  run command npm install to install dependencies

 **AuditLog**
  All audit logs with respect to log type can be find in MSSQL DB table "AuditLogs" other logs exist in ""

 **ScreenShots**
  running application screenshots are added in "UserMgmtScreenshots" folder

 **Notes**

 For the scope of work all user password are created from backend, Password can be find from postman collection login request. In real application a link send to user to create password
 agaist the profile.

 

  
