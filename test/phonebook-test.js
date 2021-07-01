let server = require('../phonebook.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { should } = require('chai');

chai.should();
chai.use(chaiHttp);

describe('Phonebook API', () => {

    /*beforeEach(function() {
        console.log("BEFORE EACH");
    });*/

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
                            done();
                        });
                });
        });

    });

    /*describe("Testing using incorrect token login details", () => {

    });

    describe("Testing with no token passed", () => {

    });*/
});
