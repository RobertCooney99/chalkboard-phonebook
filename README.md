# chalkboard-phonebook: Coding Challenge

A phonebook API built using JavaScript/Node with a MySQL Database. The API uses JSONWebTokens for authorisation purposes so that only requests with a valid API token are accepted.

Contacts in the phonebook have the following properties;

- First name
- Last name
- Work phone
- Home phone
- Mobile phone
- Other phone
- Email address
- Mailing address

## Phonebook Features

- Sort contacts by any contact property
- Sort in ascending/descending order
- View contacts in pages (dynamic page display limit)
- Create contact
- Update contact (by contact ID)
- Delete contact (by contact ID)


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

## API Documentation
