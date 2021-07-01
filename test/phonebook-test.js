let chai = require('chai');
let chaiHttp = require('chai-http');
const { should } = require('chai');
const path = require('path');
const fs = require('fs');
const { create } = require('domain');

const phonebook = require('../phonebook.js');
const server = phonebook.server;
const connection = phonebook.mysqlConnection;

chai.should();
chai.use(chaiHttp);

describe('Phonebook API', () => {

    beforeEach(function(done) {

        //Reset the database before each test
        const drop_contacts = fs.readFileSync(path.join(__dirname, '../sql/drop-table.sql')).toString();
        // Drop the table
        connection.query(drop_contacts, (err, rows, fields) => {
            if (!err) {
                const create_contacts = fs.readFileSync(path.join(__dirname, '../sql/create-table.sql')).toString();
                // Create the table
                connection.query(create_contacts, (err, rows, fields) => {
                    if (!err) {
                        const populate_contacts = fs.readFileSync(path.join(__dirname, '../sql/populate-table.sql')).toString();
                        // Populate the table
                        connection.query(populate_contacts, (err, rows, fields) => {
                            if (!err) {
                                done();
                            } else {
                                console.log(err);
                            }
                        });
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        });

    });

    describe("Testing using correct token login details", () => {

        it("Should authenticate Admin and return API token", (done) => {
            // Send correct Admin login details
            chai.request(server)
                .post('/contacts/login')
                .send({'username': 'Admin', 'password': 'password'})
                .end((err, res) => {
                    // Request should be successful
                    res.should.have.status(200);
                    // API token should be returned
                    res.body.token.should.exist;
                    done();
                });
        });

        it("Should authorise Admin to view contacts list (6 contacts)", (done) => {
            chai.request(server)
                .post('/contacts/login')
                .send({'username': 'Admin', 'password': 'password'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.token.should.exist;
                    // Get valid API token
                    var api_token = res.body.token;
                    chai.request(server)
                        // Request to view all contacts using admin API token
                        .get('/contacts')
                        .set({'token': api_token})
                        .end((error, resp) => {
                            // Request should be successful
                            resp.should.have.status(200);
                            // 6 contacts should be returned
                            resp.body.length.should.be.eq(6);
                            done();
                        });
                });
        });

        it("Should authorise admin to view one contact", (done) => {
            chai.request(server)
                .post('/contacts/login')
                .send({'username': 'Admin', 'password': 'password'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.token.should.exist;
                    // Get valid API token
                    var api_token = res.body.token;
                    chai.request(server)
                        .get('/contacts/2')
                        .set({'token': api_token})
                        .end((error, resp) => {
                            // Request should be successful
                            resp.should.have.status(200);
                            // The object in the response should have contact ID of 2
                            resp.body[0].contact_id.should.be.eq(2);
                            done();
                        });
                });
        });

        it("Should authorise admin and return nothing as contact does not exist", (done) => {
            chai.request(server)
                .post('/contacts/login')
                .send({'username': 'Admin', 'password': 'password'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.token.should.exist;
                    // Get valid API token
                    var api_token = res.body.token;
                    chai.request(server)
                        .get('/contacts/100')
                        .set({'token': api_token})
                        .end((error, resp) => {
                            // Request should be successful
                            resp.should.have.status(200);
                            // The response should be empty
                            resp.body.should.deep.equal([]);
                            done();
                        });
                });
        });

    });

    describe("Testing using incorrect token login details", () => {

        it("Should not return a token as details are incorrect", (done) => {
            // Send incorrect Admin login details
            chai.request(server)
                .post('/contacts/login')
                .send({'username': 'Admin', 'password': 'passw0rd'})
                .end((err, res) => {
                    // Request should be successful
                    res.should.have.status(200);
                    // Response text should indicate username or password is incorrect
                    res.text.should.be.eq("Incorrect login...");
                    done();
                });
        });

    });

    describe("Testing with no token passed", () => {

        it("Should not return the contacts as no token is passed", (done) => {
            chai.request(server)
                .get('/contacts')
                .end((err, res) => {
                    // Request should be successful
                    res.should.have.status(200);
                    // Response should indicate there is no API token to authorise
                    res.text.should.be.eq("No authorisation token passed...");
                    done();
                });
        });

    });
});
