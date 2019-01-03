// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should()

let server = require('../server')
let db = require('../app/config/db')

chai.use(chaiHttp)
//Our parent block
describe('KeyStore', () => {
  beforeEach((done) => { // Before each test we will empty the database
    db.none('DELETE FROM keys').then(() => {
      done()
    })
  })

  /*
  * Test set key
  */
  describe('/POST object', () => {
    it('it should POST and set the value of a key', (done) => {
      let object = {
        myKey: "myValue"
      }

      chai.request(server)
      .post('/object')
      .send(object)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.key.should.eql('myKey')
        res.body.value.should.eql('myValue')
        res.body.timestamp.should.not.be.null
        done()
      })
    })
  })

  /*
  * Test set key without key and value input
  */
  describe('/POST object', () => {
    it('it should not POST an object without a key and value', (done) => {
      chai.request(server)
      .post('/object')
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
    })
  })

  /*
  * Test set key without value input
  */
  describe('/POST object', () => {
    it('it should not POST without a value', (done) => {
      let object = {
        key: ""
      }

      chai.request(server)
      .post('/object')
      .send(object)
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
    })
  })

  /*
  * Test GET key
  */
  describe('/GET object', () => {
    it('it should GET the value of a key', (done) => {
      let object = {
        myKey: "myValue"
      }

      chai.request(server)
      .post('/object')
      .send(object)
      .end((err, res) => {
        chai.request(server)
        .get('/object/myKey')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.key.should.eql('myKey')
          res.body.value.should.eql('myValue')
          res.body.timestamp.should.not.be.null
          done()
        })
      })
    })
  })

  /*
  * Test GET key with timestamp query
  */
  describe('/GET object', () => {
    it('it should GET the value of a key with timestamp query', (done) => {
      let object = {
        myKey: "myValue"
      }

      chai.request(server)
      .post('/object')
      .send(object)
      .end((err, res) => {
        chai.request(server)
        .get(`/object/myKey?timestamp=${Date.now()}` )
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.key.should.eql('myKey')
          res.body.value.should.eql('myValue')
          res.body.timestamp.should.not.be.null
          done()
        })
      })
    })
  })

  /*
  * Test GET key with invalid timestamp query
  */
  describe('/GET object', () => {
    it('it should not GET the value of a key with invalid timestamp query', (done) => {
      let object = {
        myKey: "myValue"
      }

      chai.request(server)
      .post('/object')
      .send(object)
      .end((err, res) => {
        chai.request(server)
        .get(`/object/myKey?timestamp=a` )
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })
    })
  })

  /*
  * Test GET previous key with timestamp query
  */
  describe('/GET object', () => {
    it('it should GET the value of a previous key with timestamp query', (done) => {
      let prevObject = {
        key: "prevValue"
      }
      let nextObject = {
        key: "nextValue"
      }

      chai.request(server)
      .post('/object')
      .send(prevObject)
      .end((err, res) => {
        let prevTime = Date.now() / 1000

        setTimeout(() => {
          chai.request(server)
          .post('/object')
          .send(nextObject)
          .end((err, res) => {
            chai.request(server)
            .get(`/object/key?timestamp=${prevTime}` )
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.key.should.eql('key')
              res.body.value.should.eql('prevValue')
              res.body.timestamp.should.not.be.null
              done()
            })
          })
        }, 3000)
      })
    })
  })

})
