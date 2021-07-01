let server = require('../phonebook.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { should } = require('chai');


chai.should();
chai.use(chaiHttp);
