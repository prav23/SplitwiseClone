const Mocha = require('Mocha');
const mocha = new Mocha();

var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should register user successfully", function(done){
    chai.request('http://18.222.187.40:3001')
    .post('/register')
    .send({ "name":"Raja","email": "raja@gmail.com", "password" : "abcdef","password2" : "abcdef"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should log in the traveller successfully", function(done){
    chai.request('http://18.222.187.40:3001')
    .post('/login')
    .send({ "email": "raja@gmail.com", "password" : "abcdef"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should log in the owner successfully", function(done){
    chai.request('http://18.222.187.40:3001')
    .post('/login')
    .send({ "email": "raja@gmail.com", "password" : "abcdef"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})
