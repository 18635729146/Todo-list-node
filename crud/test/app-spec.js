const {
  app
} = require('../src/app');
const {
  asyncReadFile,
  asyncWriteFile
} = require('../src/dao')
const request = require('supertest');

describe("app", () => {
  describe("get request", () => {
    it("should get all accounts when request url pattern is '/api/tasks/'", (done) => {
      app.locals.dataFilePath = "./test/fixture.json"
      request(app).get('/api/tasks/').expect(200).expect([{
        "id": 1,
        "content": "yyy_3119305800_Restful API homework",
       "createdTime": "2019-05-15T00:00:00Z"
        },
        {
          "id":2,
      "content":"yyy_3119305800_Restful API homework2",
      "createdTime":"2019-05-15T00:00:00Z"
        }
      ]).end((err, res) => {
        if (err) throw err;
        done()
      })
    })

    it("should get specific account when request url patten is '/accounts/:email'", (done) => {
      request(app).get('/api/tasks/content').expect(200).expect({
        "id":2,
      "content":"yyy_3119305800_Restful API homework2",
      "createdTime":"2019-05-15T00:00:00Z"
      }).end((err, res) => {
        if (err) throw err;
        done()
      })
    })
  })

  describe("post request", () => {
    afterEach(async function () {
      await asyncWriteFile(JSON.stringify([{
        "id":1,
        "content":"yyy_3119305800_Restful API homework",
        "createdTime":"2019-05-15T00:00:00Z"
        },
        {
          "id":2,
      "content":"yyy_3119305800_Restful API homework2",
      "createdTime":"2019-05-15T00:00:00Z"
        }
      ]), "./test/fixture.json")
    })
    it("should create a account when the corresponding email does not exist in the datasource", (done) => {
      request(app).post('/api/tasks/').send({
        "id":1,
        "content":"yyy_3119305800_Restful API homework",
        "createdTime":"2019-05-15T00:00:00Z"
      }).expect(201).expect([{
        "id":3,
        "content":"yyy_3119305800_Restful API homework",
        "createdTime":"2019-05-15T00:00:00Z"
        },
        {
          "id":1,
        "content":"Restful API homework",
        "createdTime":"2019-05-15T00:00:00Z"
        },
        {
          "id":1,
        "content":"yyy_3119305800_Restful API homework",
        "createdTime":"2022-05-15T00:00:00Z"
        }
      ]).end((err, res) => {
        if (err) throw err;
        done()
      })
    })

    it("should not create the account when its email has already existed in the datasource", (done) => {
      request(app).post('/api/tasks/').send({
        "id":1,
        "content":"yyy_3119305800_Restful API homework",
        "createdTime":"2019-05-15T00:00:00Z"
      }).expect(400).end((err, res) => {
        if (err) throw err;
        done()
      })
    })
  })
})
