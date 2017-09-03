const supertest = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
describe('Home unit test',()=>{
  it('should return home page',function(done){
    supertest(app)
      .get('/')
      .expect('Content-type',/json/)
      .expect(200)
      .end((err,res)=>{
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('api');
        expect(res.body.data).to.deep.equal({ api: 'v1.0' });
        expect(res.body.code).to.equal(200);
        done();
      });
  });
});

