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
- Some validation of user inputs
- API token and authorisation for the admin account

## Setting up the Chalkboard Phonebook

### Database

The database was set up using MySQL Server and MySQL Workbench. A database called phonebook must be created, running on **port 3306** on **localhost**. Add a user with the following details;

- **Username:** root
- **password:** password

From the **sql** folder execute **create-table.sql** and **populate-table.sql**.

### Node App

```
git clone git@github.com:RobertCooney99/chalkboard-phonebook.git
cd chalkboard-phonebook
npm i
npm start
```

### Testing

In **chalkboard-phonebook**:

```
npm i --save-dev
npm test
```

### Tests

**1:** Test if sending the correct admin details to **/contacts/login** correctly returns an API token.

**2:** Test if API returns all contacts on **/contacts** (given a valid API token)

**3:** Test if API returns one contact on **/contacts/:id** (given a valid API token)

**4:** Test if API returns no contacts when an unknown ID is entered on **/contacts/:id** (given a valid API token)

**5:** Test if sending the incorrect admin details to **/contacts/login** correctly returns no API token

**6:** Test if the API refuses to return contacts when no API token is passed to **/contacts**

## API Documentation: Endpoints

### POST /contacts/login

**username** and **password** must be sent. If the user details are correct then an API token is returned.

### GET /contacts

Display contacts in the phonebook.

- **token** must be passed in the request header.

Optional to pass in;

- **page**: Page number to display
- **display_limit**: Number of contacts per page
- **sort_attribute**: Attribute to sort the contacts by (default - contact ID)
- **sort_method**: ASC or DESC (default - ASC)

### POST /contacts/:id

Display just one contact.

- **token** must be passed in the request header.

### POST /contacts/create

Add a contact to the database.

- **token** must be passed in the request header.

Optional to pass in contact details in the format;

- **field_name**: field_value

Any field name's not present in the request are treated as **NULL** values.

### POST /contacts/update/:id

Update a specific contact by contact ID.

- **token** must be passed in the request header.

Optional to pass in contact details in the format;

- **field_name**: field_value

Any field name's not present in the request are treated as **NULL** values and will be overwritten.

### DELETE /contacts/delete/:id

Delete a specific contact by contact ID.

- **token** must be passed in the request header.




