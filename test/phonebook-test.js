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
                //console.log("Table dropped");
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
                    done();
                    //console.log(res.body.token);
                });
        });

        it("Should authorise Admin to view contacts list (6 contacts)", (done) => {
            chai.request(server)
                .post('/contacts/login')
                .send({'username': 'Admin', 'password': 'password'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.token.should.exist;
                    var api_token = res.body.token;
                    //console.log(api_token);
                    chai.request(server)
                        .get('/contacts')
                        .set({'token': api_token})
                        .end((error, resp) => {
                            resp.should.have.status(200);
                            resp.body.length.should.be.eq(6);
                            done();
                            //console.log(resp.body.length);
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
                    var api_token = res.body.token;
                    //console.log(api_token);
                    chai.request(server)
                        .get('/contacts/2')
                        .set({'token': api_token})
                        .end((error, resp) => {
                            resp.should.have.status(200);
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
                    var api_token = res.body.token;
                    //console.log(api_token);
                    chai.request(server)
                        .get('/contacts/100')
                        .set({'token': api_token})
                        .end((error, resp) => {
                            resp.should.have.status(200);
                            resp.body.should.deep.equal([]);
                            done();
                        });
                });
        });

    });
});
