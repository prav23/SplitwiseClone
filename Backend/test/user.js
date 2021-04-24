let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

it("Case : Get Users"), (done) => {
    chai.request("http://ec2-52-15-69-100.us-east-2.compute.amazonaws.com:3001")
    .get('/api/users')
    .then((res) => {
        expect(res.status).to.equal(200);
        done();
    })
}

it("Case : Post Login"), (done) => {
    chai.request("http://ec2-52-15-69-100.us-east-2.compute.amazonaws.com:3001")
    .post('/api/login')
    .set('Accept', 'application/json')
    .send({
        "email": "kumar@gmail.com",
        "password": "kumar",
    })
    .then((res) => {
        console.log(res.data.data.user_id);
        expect(res.data.data.user_id).to.equal(1);
        done();
    })
}