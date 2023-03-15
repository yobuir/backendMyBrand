const app = require("../server.js"); 
const request = require('supertest');
const  mongoose = require("mongoose");    
require('dotenv').config(); 
const chai =require("chai");
const chaiHttp =require ("chai-http"); 
chai.should();
chai.use(chaiHttp);
// chai.config.includeStack = true; // turn on stack trace
// chai.config.showDiff = false;
// chai.config.truncateThreshold = 0;
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

 

      //  describe('user apis ', () => { 

      //     it("It should not GET all the users {unauthorized}", (done) => {
      //       chai
      //         .request(app)
      //         .get("/api/users/all")
      //         .end((err, response) => {
      //           response.should.have.status(401); 
      //           done();
      //         });
      //         });

      //       it('should create new user', function (done) {
      //           const number = Math.floor(Math.random() * 10000);
      //            const user = {
      //                           name: `${number}`,
      //                           email: `${number}demo@gmail.com`,
      //                           password: "test", 
      //                           confirm_password: "test",
      //                           role: "admin"
      //                           } 
                
      //             chai  
      //                 .request(app)
      //                   .post('/api/users/create') 
      //                   .send(user)
      //                   .end((err,response) => {  
      //                      response.should.have.status(200);
      //                       done();
      //                   });
                       

      //       });
            
      //       it('should  not create new user [exit]', function (done) {
      //           const number = Math.floor(Math.random() * 10000);
      //            const user = {
      //                           name: `demo`,
      //                           email: `demotest@gmail.com`,
      //                           password: "test", 
      //                           confirm_password: "test",
      //                           role: "admin"
      //                           } 
                
      //             chai  
      //                 .request(app)
      //                   .post('/api/users/create') 
      //                   .send(user)
      //                   .end((err,response) => {  
      //                      response.should.have.status(500);
      //                       done();
      //                   });
                       

      //       });


      //        it('should  not create new user [empty space detected]', function (done) {
      //           const number = Math.floor(Math.random() * 10000);
      //            const user = {
      //                           name: '',
      //                           email:'',
      //                           password: " "
      //                           } 
                
      //             chai  
      //                 .request(app)
      //                   .post('/api/users/create') 
      //                   .send(user)
      //                   .end((err,response) => {  
      //                      response.should.have.status(500);
      //                       done();
      //                   });
                       

      //       });


      //       it('should  uppdate user [logged in]', function (done) {
      //          const number = Math.floor(Math.random() * 10000);
      //            const user = {
      //                           name: `${number}UpdatedNow`,
      //                           email: `demo${number}@gmail.com`,
      //                           password: "test", 
      //                           confirm_password: "test",
      //                           role: "admin"
      //                           } 

      //             const loguser = {
      //                   email: 'demo@gmail.com',
      //                   password: 'test'
      //                 };
                      
      //                 chai
      //                   .request(app)
      //                   .post("/api/auth/login")
      //                   .send(loguser)
      //                   .end((err, response) => {
      //                     response.should.have.status(200); 
      //                     response.body.should.have.property("token");
      //                     const token =response.body.token; 
      //                     const id='6411b0c425adfca71216047e'; 
                        
      //                     chai  
      //                         .request(app)
      //                           .put(`/api/users/update/${id}`)
      //                           .set({ Authorization: `Bearer ${token}` }) 
      //                           .send(user) 
      //                           .end((err,response) => {  
      //                             response.should.have.status(200);
      //                               done();
      //                           }); 
      //                   }); 
                       

      //       });

      //         it('should  delete user [logged in]', function (done) { 

      //             const loguser = {
      //                   email: 'demo@gmail.com',
      //                   password: 'test'
      //                 };
                      
      //                 chai
      //                   .request(app)
      //                   .post("/api/auth/login")
      //                   .send(loguser)
      //                   .end((err, response) => {
      //                     response.should.have.status(200); 
      //                     response.body.should.have.property("token");
      //                     const token =response.body.token; 
      //                     const id='6411b0c425adfca71216047e'; 
                        
      //                     chai  
      //                         .request(app)
      //                           .delete(`/api/users/delete/${id}`)
      //                           .set({ Authorization: `Bearer ${token}` })  
      //                           .end((err,response) => {  
      //                             response.should.have.status(200);
      //                               done();
      //                           }); 
      //                   }); 
                       

      //       });

            
      //   });

      // describe('post apis ', () => {

      //   //  it("It should  GET all the posts ", (done) => {
      //   //     chai
      //   //       .request(app)
      //   //       .get("/api/posts/all")
      //   //       .end((err, response) => {
      //   //         response.should.have.status(200); 
      //   //         done();
      //   //       });
      //   //   });

      //     // it("It should not get single post [ server error] ", (done) => {
      //     //   const id= '8328';
      //     //   chai
      //     //     .request(app)
      //     //     .get(`/api/posts/${id}`)
      //     //     .end((err, response) => {
      //     //       response.body.should.have.property('message').equal("Error viewing post");;
      //     //       response.should.have.status(500);

      //     //       done();
      //     //     });
      //     // });

          
      //     //   it('create new bolog', function (done) { 
      //     //     const post= {
      //     //               snippet:"testing blog ",
      //     //               title: "new blog",
      //     //               body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
      //     //               image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      //     //               published:1
                          
      //     //               }
      //     //         const loguser = {
      //     //               email: 'demo@gmail.com',
      //     //               password: 'test'
      //     //             };
                      
      //     //             chai
      //     //               .request(app)
      //     //               .post("/api/auth/login")
      //     //               .send(loguser)
      //     //               .end((err, response) => {
      //     //                 response.should.have.status(200); 
      //     //                 response.body.should.have.property("token");
      //     //                 const token =response.body.token;  
                        
      //     //                 chai  
      //     //                     .request(app)
      //     //                       .post('/api/posts/create')
      //     //                       .set({ Authorization: `Bearer ${token}` }) 
      //     //                       .send(post) 
      //     //                       .end((err,response) => {   
      //     //                         response.should.have.status(200);
      //     //                           done();
      //     //                       }); 
      //     //               }); 
                       

      //     //   });

      //     //    it('should not create  new bolog [not admin]', function (done) { 
      //     //     const post= {
      //     //               snippet:"testing blog ",
      //     //               title: "new blog",
      //     //               body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
      //     //               image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      //     //               published:1
                          
      //     //               }
      //     //         const loguser = {
      //     //               email: 'demotest@gmail.com',
      //     //               password: 'test'
      //     //             };
                      
      //     //             chai
      //     //               .request(app)
      //     //               .post("/api/auth/login")
      //     //               .send(loguser)
      //     //               .end((err, response) => {
      //     //                 response.should.have.status(200); 
      //     //                 response.body.should.have.property("token");
      //     //                 const token =response.body.token;  
                        
      //     //                 chai  
      //     //                     .request(app)
      //     //                       .post('/api/posts/create')
      //     //                       .set({ Authorization: `Bearer ${token}` }) 
      //     //                       .send(post) 
      //     //                       .end((err,response) => {   
      //     //                         response.should.have.status(403);
      //     //                           done();
      //     //                       }); 
      //     //               }); 
                       

      //     //   });


      //     // it("It should  get single post [ success] ", (done) => {
      //     //   const id= '6411cacab91b0a9a62b43adc';
      //     //   chai
      //     //     .request(app)
      //     //     .get(`/api/posts/${id}`)
      //     //     .end((err, response) => {
      //     //       response.body.should.have.property('message').equal("Viewing single post");;
      //     //       response.should.have.status(200);

      //     //       done();
      //     //     });
      //     // });

      //     // it('should  update blog [logged in]', function (done) {
      //     //      const number = Math.floor(Math.random() * 10000);
      //     //             const post= {
      //     //               snippet:"testing blog update",
      //     //               title: "new blog",
      //     //               body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
      //     //               image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      //     //               published:1
                          
      //     //               }

      //     //         const loguser = {
      //     //               email: 'demo@gmail.com',
      //     //               password: 'test'
      //     //             };
                      
      //     //             chai
      //     //               .request(app)
      //     //               .post("/api/auth/login")
      //     //               .send(loguser)
      //     //               .end((err, response) => {
      //     //                 response.should.have.status(200); 
      //     //                 response.body.should.have.property("token");
      //     //                 const token =response.body.token; 
      //     //                 const id='6411cacab91b0a9a62b43adc'; 
                        
      //     //                 chai  
      //     //                     .request(app)
      //     //                       .put(`/api/posts/update/${id}`)
      //     //                       .set({ Authorization: `Bearer ${token}` }) 
      //     //                       .send(post) 
      //     //                       .end((err,response) => {  
      //     //                         response.should.have.status(200);
      //     //                           done();
      //     //                       }); 
      //     //               }); 
                       

      //     //   });

      //     it('should  delete blog [logged in]', function (done) {  
      //             const loguser = {
      //                   email: 'demo@gmail.com',
      //                   password: 'test'
      //                 };
                      
      //                 chai
      //                   .request(app)
      //                   .post("/api/auth/login")
      //                   .send(loguser)
      //                   .end((err, response) => {
      //                     response.should.have.status(200); 
      //                     response.body.should.have.property("token");
      //                     const token =response.body.token; 
                          
      //                     const post= {
      //                       snippet:"testing blog ",
      //                       title: "new blog delete",
      //                       body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
      //                       image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      //                       published:1
                              
      //                       } 
      //                     chai .request(app)
      //                           .post('/api/posts/create')
      //                           .set({ Authorization: `Bearer ${token}` }) 
      //                           .send(post) 
      //                           .end((err,response) => {   
      //                             response.should.have.status(200);
      //                             console.log(response.body.data._id);
      //                             const id=response.body.data._id; 
                                
      //                             chai  
      //                                 .request(app)
      //                                   .delete(`/api/posts/${id}`)
      //                                   .set({ Authorization: `Bearer ${token}` })  
      //                                   .end((err,response) => {  
      //                                     response.should.have.status(200);
      //                                     done();
      //                               });  
      //                           }); 
                          
      //                   }); 
                       

      //       }); 

      //  });
    
        
});