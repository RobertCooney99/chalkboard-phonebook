let chai = require('chai');
let chaiHttp = require('chai-http');
const phonebook = require('../phonebook.js');
const server = phonebook.server;
const connection = phonebook.mysqlConnection;
const { should } = require('chai');
const path = require('path');
const fs = require('fs');
const { create } = require('domain');

chai.should();
chai.use(chaiHttp);


describe('Phonebook API', () => {

    beforeEach(function(done) {
        //Reset the database before each test
        const drop_contacts = fs.readFileSync(path.join(__dirname, '../sql/drop-table.sql')).toString();
        connection.query(drop_contacts, (err, rows, fields) => {
            if (!err) {
                //console.log("Table dropeed");
                const create_contacts = fs.readFileSync(path.join(__dirname, '../sql/create-table.sql')).toString();
                connection.query(create_contacts, (err, rows, fields) => {
                    if (!err) {
                        //console.log("Table created");
                        const populate_contacts = fs.readFileSync(path.join(__dirname, '../sql/populate-table.sql')).toString();
                        connection.query(populate_contacts, (err, rows, fields) => {
                            if (!err) {
                                //console.log("Table populated");
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
            chai.request(server)
                .post('/contacts/login')
                .send({'username': 'Admin', 'password': 'password'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.token.should.exist;
                    //console.log(res.body.token);
                });
            done();
        });

        it("Should allow Admin to view contacts list", (done) => {
            chai.request(server)
                .post('/contacts/login')
                .send({'username': 'Admin', 'password': 'password'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.token.should.exist;
                    var api_token = res.body.token;
                    console.log(api_token);
                    chai.request(server)
                        .get('/contacts')
                        .set({'token': api_token})
                        .end((error, resp) => {
                            resp.should.have.status(200);
                            //console.log(resp.body);
                        });
                });
            done();
        });

    });
});
