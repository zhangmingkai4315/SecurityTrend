const supertest = require('supertest');
const expect = require('chai').expect;
const User = require('../models/User');
const app = require('../app');

const testCase = [
  { email: 'test@example.com', password: 'password', password_confirm: 'password' },
  { email: 'test@example.com', password: 'password'},
  { email: 'test@example.com', password: 'password', password_confirm: 'password1' },
  { email: 'test@example.com', password: 'notcorrectpassword'},
  { email: 'test', password: 'password', password_confirm: 'password' },
  { old_password: 'password', password: 'password123' },
  { old_password: 'notcorrect', password: 'password123' },
];

let user_id = 0;
let token = '';
describe('user unit test', () => {
  before((done)=>{
    User.sync({ force: true }) // drops table and re-creates it
      .then(function () {
        done(null);
      })
      .catch(function (error) {
        done(error);
      });
  });


  it('should create a new user', function (done) {
    supertest(app)
      .post('/users/signup')
      .send(testCase[0])
      .expect('Content-type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('code');
        expect(res.body.data).to.have.property('token');
        token = res.body.data.token;
        done();
      });
  });

  it('should not create a new user without confirm password', function (done) {
    supertest(app)
      .post('/users/signup')
      .send(testCase[1])
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('the confirmed password not equal to the password');
        expect(res.body).to.have.property('code');
        done();
      });
  });

  it('should not create a new user with not the same confirm password', function (done) {
    supertest(app)
      .post('/users/signup')
      .send(testCase[2])
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('code');
        done();
      });
  });

  it('should not create a new user with not correct email address', function (done) {
    supertest(app)
      .post('/users/signup')
      .send(testCase[4])
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('code');
        done();
      });
  });
  it('should not create a new user with same user information', function (done) {
    supertest(app)
      .post('/users/signup')
      .send(testCase[0])
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('code');
        done();
      });
  });

  it('should return users list with only one user', function (done) {
    supertest(app)
      .get('/users')
      .set('x-access-token', token)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.length(1);
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0].email).to.equal(testCase[0].email);
        user_id = res.body.data[0].id;
        done();
      });
  });


  it('should return one user', function (done) {
    supertest(app)
      .get('/users/'+user_id)
      .set('x-access-token', token)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data.email).to.equal(testCase[0].email);
        done();
      });
  });

  it('should return 404 with not correct user id', function (done) {
    supertest(app)
      .get('/users/' + 10000)
      .set('x-access-token', token)
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('not found');
        done();
      });
  }); 

  it('should update success with correct information', function (done) {
    supertest(app)
      .put('/users/'+user_id)
      .set('x-access-token', token)
      .send({'username':'mike'})
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal('update success');
        done();
      });
  });



  it('should login user success with correct user information', function (done) {
    supertest(app)
      .post('/users/login')
      .send(testCase[0])
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.not.have.property('error');
        token = res.body.data.token;
        done();
      });
  });

  it('should login user fail with not correct user information', function (done) {
    supertest(app)
      .post('/users/login')
      .send(testCase[3])
      .expect('Content-type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('password is not correct');
        done();
      });
  });

  it('should change password with correct old password', function (done) {
    supertest(app)
      .put('/users/' + user_id + '/password')
      .set('x-access-token', token)
      .send(testCase[5])
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal('change password success');
        done();
      });
  });
  it('should not change password with not correct old password', function (done) {
    supertest(app)
      .put('/users/' + user_id + '/password')
      .set('x-access-token', token)
      .send(testCase[6])
      .expect('Content-type', /json/)
      .expect(403)
      .end((err, res) => {
        expect(res.body.error).to.equal('password is not correct');
        done();
      });
  });
  
  it('should login with new password success', function (done) {
    supertest(app)
      .post('/users/login')
      .send(Object.assign({},testCase[1],testCase[5]))
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.not.have.property('error');
        token = res.body.data.token;
        done();
      });
  });

  it('should delete user with correct user id', function (done) {
    supertest(app)
      .delete('/users/'+user_id)
      .set('x-access-token', token)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.equal('delete success');
        done();
      });
  });

  it('should not delete user with not correct user id', function (done) {
    supertest(app)
      .delete('/users/' + 10000)
      .set('x-access-token', token)
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).to.equal('not found');
        done();
      });
  });
});

