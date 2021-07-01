# chalkboard-phonebook: Coding Challenge

A phonebook API built using JavaScript/Node with a MySQL Database. The API uses JSONWebTokens for authorisation purposes so that only requests with a valid API token are accepted.

Contacts in the phonebook have the following properties;

First name, last name, work phone, home phone, mobile phone, other phone, email address and mailing address.

All contacts in the phonebook can be displayed or they can be displayed in pages with a dynamic page display limit. Contacts can be sorted by any of their properties in either ascending or descending order. Contacts can be created, deleted and updated.

## Setting up the Chalkboard Phonebook

### Database

The database was set up using MySQL Server and MySQL Workbench. A database called phonebook must be created, running on **port 3306** on **localhost**. Add a user with the following details;

- **Username:** root
- **password:** password

### Node App

```
git clone git@github.com:RobertCooney99/chalkboard-phonebook.git
cd chalkboard-phonebook
npm i
npm start
```
