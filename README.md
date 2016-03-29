# DESCRIPTION
Web application written in Node.js which is divided in two parts:

* appPublic: the actual website accessible to the public
* appAdmin: the administration interface

These two parts are **two completely separate applications** and need to listen on different ports.  
The appAdmin app must not be accesible to the internet! Use SSH local port forwarding to access it.

# REQUIREMENTS
This project is meant to work on a Debian machine.  
The following debian packages need to be installed first:

* nodejs
* node-sqlite3
* node-jade
* node-express
* libjs-highlight.js
* libjs-jquery
* libjs-jquery-cookie

# INSTALLATION
Before starting one of the applications, make sure to follow these steps:

1. Install all the debian packages that are mentioned in the Requirements section.
2. Create an sqlite3 compliant database file named "database.sqlite" in the *database* folder and import the database.sql file in it. Example:  
    ```$ sqlite3 database/database.sqlite```  
    ```$ .read database.sql```
           

# TESTING
Install the unit tester Mocha and run the tests with it.
```$ mocha tests/test.js```
