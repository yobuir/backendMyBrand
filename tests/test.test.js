const app = require("../server.js"); 
const request = require('supertest');
const  mongoose = require("mongoose");    
require('dotenv').config(); 
const chai =require("chai");
const chaiHttp =require ("chai-http"); 
chai.should();
chai.use(chaiHttp);
chai.config.includeStack = true; // turn on stack trace
chai.config.showDiff = false;
chai.config.truncateThreshold = 0;
const { MongoClient, ServerApiVersion } = require('mongodb');

describe("all API", () => {
  /**
   * Test the USER route
   */
  before(() => { 
      
      const uri = "mongodb+srv://admin:admin@cluster0.oodujcz.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
      });

  });


  describe("GET all users", () => {
    it("It should GET all the users", (done) => {
      chai
        .request(app)
        .get("api/users/all")
        .end((err, response) => {
          response.should.have.status(200); 
          done();
        });
    });
     });

});