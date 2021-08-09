# Phonebook API: Coding Challenge (3h time-limit)

A phonebook API built using JavaScript/Node with a MySQL Database. The API uses JSONWebTokens for authorisation purposes so that only requests with a valid API token are accepted, the JWT package was used as data transmissions can be signed. Express was used as a framework.

I chose to use MySQL mainly because it is highly scalable, and it is likely that in a full implementation of a phonebook there would be large amounts of data to store in a relational database. Also, as the functionality of a phonebook revolves around being able to "look-up" people/numbers/locations etc... it is important that the database provides high performance.

Due to the time constraints of the challenge there are many features missing from the API which would have been added if I had more time. Firstly, input validation is missing in a lot of the endpoints. Also, I would have implemented the option to search for contacts with specific attributes (**e.g.** first name = "Alan"). Another feature that I would have added is the ability to update only certain attributes of a contact, as it stands any values that aren't passed into the update request are treated as NULL and overwrite the existing values. Lastly, I would have added more tests to the API. Throughout the implementation I used Postman to test the API endpoints with varius test-cases, however, I didn't have the time to include tests for all possible cases. These tests would cover authorised and unauthorised API requests, validation of user inputs and the responses of database queries.

# Contact Details

**Robert Cooney**

robertcooney99@gmail.com

https://github.com/RobertCooney99



## Phonebook Features

Contacts in the phonebook have the following properties;

- First name
- Last name
- Work phone
- Home phone
- Mobile phone
- Other phone
- Email address
- Mailing address

--------------------

- Sort contacts by any contact property
- Sort in ascending/descending order
- View contacts in pages (dynamic page display limit)
- Create contact
- Update contact (by contact ID)
- Delete contact (by contact ID)
- Some validation of user inputs
- API token and authorisation for the admin account

## Setting up the Phonebook

### Database

The database was set up using MySQL Server and MySQL Workbench. A database called phonebook must be created, running on **port 3306** on **localhost**. Add a user with the following details;

- **Username:** root
- **password:** password

From the **sql** folder execute **create-table.sql** and **populate-table.sql**.

### Node App

```
git clone https://github.com/RobertCooney99/phonebook-api-challenge.git
cd phonebook-api-challenge
npm i
npm start
```

### Testing

In **phonebook-api-challenge**:

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




