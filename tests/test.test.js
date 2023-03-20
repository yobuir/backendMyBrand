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
          // const uri = "mongodb+srv://admin:admin@cluster0.oodujcz.mongodb.net/?retryWrites=true&w=majority";
          // const uri=process.env.TEST_MONGO_URI;
          // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
          // client.connect(err => {
          //   const collection = client.db("test").collection("devices");
          //   // perform actions on the collection object
          //   client.close();
          // });

      });

       describe('user apis ', () => { 

          it("It should not GET all the users {unauthorized}", (done) => {
            chai
              .request(app)
              .get("/api/users/all")
              .end((err, response) => {
                response.should.have.status(401); 
                done();
              });
              });

            it('should create new user', function (done) {
                const number = Math.floor(Math.random() * 10000);
                 const user = {
                                name: `${number}`,
                                email: `${number}demo@gmail.com`,
                                password: "test", 
                                confirm_password: "test",
                                role: "admin"
                                } 
                
                  chai  
                      .request(app)
                        .post('/api/users/create') 
                        .send(user)
                        .end((err,response) => {   
                           response.should.have.status(200);
                            done();
                        });
                       

            });
            
            it('should  not create new user [exit]', function (done) {
                const number = Math.floor(Math.random() * 10000);
                 const user = {
                                name: `demo`,
                                email: `demotest@gmail.com`,
                                password: "test", 
                                confirm_password: "test",
                                role: "admin"
                                } 
                
                  chai  
                      .request(app)
                        .post('/api/users/create') 
                        .send(user)
                        .end((err,response) => {  
                           response.should.have.status(500);
                            done();
                        });
                       

            });


             it('should  not create new user [empty space detected]', function (done) {
                const number = Math.floor(Math.random() * 10000);
                 const user = {
                                name: '',
                                email:'',
                                password: " "
                                } 
                
                  chai  
                      .request(app)
                        .post('/api/users/create') 
                        .send(user)
                        .end((err,response) => {  
                           response.should.have.status(500);
                            done();
                        });
                       

            });


            it('should  uppdate user [logged in]', function (done) {
               const number = Math.floor(Math.random() * 10000);
                 const user = {
                                name: `${number}UpdatedNow`,
                                email: `demo${number}@gmail.com`,
                                password: "test", 
                                confirm_password: "test",
                                role: "admin"
                                } 

                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token; 
                          const id='6411b0c425adfca71216047e'; 
                        
                          chai  
                              .request(app)
                                .put(`/api/users/update/${id}`)
                                .set({ Authorization: `Bearer ${token}` }) 
                                .send(user) 
                                .end((err,response) => {  
                                  response.should.have.status(200);
                                    done();
                                }); 
                        }); 
                       

            });

              it('should  delete user [logged in]', function (done) { 

                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token; 
                          const id='6411b0c425adfca71216047e'; 
                        
                          chai  
                              .request(app)
                                .delete(`/api/users/delete/${id}`)
                                .set({ Authorization: `Bearer ${token}` })  
                                .end((err,response) => {  
                                  response.should.have.status(200);
                                    done();
                                }); 
                        }); 
                       

            });

            
        });

      describe('post apis ', () => {

         it("It should  GET all the posts ", (done) => {
            chai
              .request(app)
              .get("/api/posts/all")
              .end((err, response) => {
                response.should.have.status(200); 
                done();
              });
          });

          it("It should not get single post [ server error] ", (done) => {
            const id= '8328';
            chai
              .request(app)
              .get(`/api/posts/${id}`)
              .end((err, response) => {
                response.body.should.have.property('message').equal("Error viewing post");;
                response.should.have.status(500);

                done();
              });
          });

          
          it('create new bolog', function (done) { 
              const post= {
                        snippet:"testing blog ",
                        title: "new blog",
                        body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                        image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
                        published:1
                          
                        }
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                        
                          chai  
                              .request(app)
                                .post('/api/posts/create')
                                .set({ Authorization: `Bearer ${token}` }) 
                                .send(post) 
                                .end((err,response) => {   
                                  response.should.have.status(200);
                                    done();
                                }); 
                        }); 
                       

            });

             it('should not create  new bolog [not admin]', function (done) { 
              const post= {
                        snippet:"testing blog ",
                        title: "new blog",
                        body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                        image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
                        published:1
                          
                        }
                  const loguser = {
                        email: 'demotest@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                        
                          chai  
                              .request(app)
                                .post('/api/posts/create')
                                .set({ Authorization: `Bearer ${token}` }) 
                                .send(post) 
                                .end((err,response) => {   
                                  response.should.have.status(403);
                                    done();
                                }); 
                        }); 
                       

            });


          it("It should  get single post [ success] ", (done) => {
            const id= '6411cacab91b0a9a62b43adc';
            chai
              .request(app)
              .get(`/api/posts/${id}`)
              .end((err, response) => {
                response.body.should.have.property('message').equal("Viewing single post");;
                response.should.have.status(200);

                done();
              });
          });

          it('should  update blog [logged in]', function (done) {
               const number = Math.floor(Math.random() * 10000);
                      const post= {
                        snippet:"testing blog update",
                        title: "new blog",
                        body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                        image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
                        published:1
                          
                        }

                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token; 
                          const id='6411cacab91b0a9a62b43adc'; 
                        
                          chai  
                              .request(app)
                                .put(`/api/posts/update/${id}`)
                                .set({ Authorization: `Bearer ${token}` }) 
                                .send(post) 
                                .end((err,response) => {  
                                  response.should.have.status(200);
                                    done();
                                }); 
                        }); 
                       

            });

          it('should  delete blog [logged in]', function (done) {  
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token; 
                          
                          const post= {
                            snippet:"testing blog ",
                            title: "new blog delete",
                            body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                            image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
                            published:1
                              
                            } 
                          chai .request(app)
                                .post('/api/posts/create')
                                .set({ Authorization: `Bearer ${token}` }) 
                                .send(post) 
                                .end((err,response) => {   
                                  response.should.have.status(200); 
                                  const id=response.body.data._id; 
                                
                                  chai  
                                      .request(app)
                                        .delete(`/api/posts/${id}`)
                                        .set({ Authorization: `Bearer ${token}` })  
                                        .end((err,response) => {  
                                          response.should.have.status(200);
                                          done();
                                    });  
                                }); 
                          
                        }); 
                       

            }); 

       });

    describe('portfolio apis ', () => {

          // it("It should get all portfolio", (done) => {
          //   chai
          //     .request(app)
          //     .get("/api/portfolios/all")
          //     .end((err, response) => {
          //       response.should.have.status(200); 
          //       done();
          //     });
          // });
 
          //  it('should  create portolio', function (done) { 
          //         const loguser = {
          //               email: 'demo@gmail.com',
          //               password: 'test'
          //             };
                      
          //             chai
          //               .request(app)
          //               .post("/api/auth/login")
          //               .send(loguser)
          //               .end((err, response) => {
          //                 response.should.have.status(200); 
          //                 response.body.should.have.property("token");
          //                 const token =response.body.token;  
          //                 const portfolio={
          //                       published:true,
          //                       image:"https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
          //                       title:"project 1",
          //                       link:"stepin.rw"
          //                   }
                        
          //                 chai  
          //                     .request(app)
          //                       .post('/api/portfolios/create')
          //                       .set({ Authorization: `Bearer ${token}` }) 
          //                       .send(portfolio) 
          //                       .end((err,response) => {  
          //                         response.should.have.status(200);
          //                           done();
          //                       }); 
          //               }); 
                       

          //   });
            
        // it('should  delete portolio [logged in]', function (done) {  
        //   const loguser = {
        //         email: 'demo@gmail.com',
        //         password: 'test'
        //       };
              
        //       chai
        //         .request(app)
        //         .post("/api/auth/login")
        //         .send(loguser)
        //         .end((err, response) => {
        //           response.should.have.status(200); 
        //           response.body.should.have.property("token");
        //           const token =response.body.token; 
                  
        //           const portfolio={
        //                         published:true,
        //                         image:"https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        //                         title:"project 1",
        //                         link:"stepin.rw"
        //                     } 
        //               chai 
        //                 .request(app)
        //                 .post('/api/portfolios/create')
        //                 .set({ Authorization: `Bearer ${token}` }) 
        //                 .send(portfolio) 
        //                 .end((err,response) => {   
        //                   response.should.have.status(200); 
        //                   const id=response.body.data._id; 
                        
        //                   chai  
        //                       .request(app)
        //                       .delete(`/api/portfolios/delete/${id}`)
        //                       .set({ Authorization: `Bearer ${token}` })  
        //                       .end((err,response) => {   
        //                           response.should.have.status(200);
        //                           done();
        //                     });  
        //                 }); 
                  
        //         }); 
                

        // }); 

        // it('should  update portolio [logged in]', function (done) {  
        //   const loguser = {
        //         email: 'demo@gmail.com',
        //         password: 'test'
        //       };
        //   const portfolio={
        //           published:false,
        //           image:"https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        //           title:"project updated",
        //           link:"stepin.rw"
        //       }
                  
        //       chai
        //         .request(app)
        //         .post("/api/auth/login")
        //         .send(loguser)
        //         .end((err, response) => {
        //           response.should.have.status(200); 
        //           response.body.should.have.property("token");
        //           const token =response.body.token;   
        //                 const id='6411d42c02f0a4df30533bcc';  
        //                   chai  
        //                       .request(app)
        //                       .put(`/api/portfolios/update/${id}`)
        //                       .send(portfolio)
        //                       .set({ Authorization: `Bearer ${token}` })  
        //                       .end((err,response) => {   
        //                           response.should.have.status(200);
        //                           done();
        //                     });  
        //                 }); 
                  
        //         }); 
        }); 

        describe('likes apis', ()=>{ 

            it('like  new created bolog', function (done) { 
              const post= {
                        snippet:"testing blog liking",
                        title: "new blog testing",
                        body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                        image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
                        published:1
                          
                        }
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                        
                          chai  
                              .request(app)
                                .post('/api/posts/create')
                                .set({ Authorization: `Bearer ${token}` }) 
                                .send(post) 
                                .end((err,response) => {   
                                response.should.have.status(200);
                            
                             const like = { 
                                          liked: 1,
                                          post_id:  response.body.data._id,
                                          user_id: '6411b05f139a209149b175ef'
                                        }   
                              chai 
                                  .request(app)
                                  .post('/api/likes/create')
                                  .set({ Authorization: `Bearer ${token}` }) 
                                  .send(like) 
                                  .end((err,response) => {   
                                      response.should.have.status(200); 
                                    done();
                                  });
                                }); 
                        }); 
            });
          

          it("It should  all the likes", (done) => {
            chai
              .request(app)
              .get("/api/likes/all")
              .end((err, response) => {
                response.should.have.status(200); 
                done();
              });
            });

        });

        describe ('comments api',()=>{
          
            it('comments on  new created blog', function (done) { 
              const post= {
                        snippet:"testing blog liking",
                        title: "new blog testing",
                        body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                        image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
                        published:1
                          
                        }
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                        
                          chai  
                              .request(app)
                                .post('/api/posts/create')
                                .set({ Authorization: `Bearer ${token}` }) 
                                .send(post) 
                                .end((err,response) => {   
                                response.should.have.status(200);
                            
                             const comment = { 
                                          comment:"this is new comment testing ",
                                          post_id:  response.body.data._id,
                                          user_id: '6411b05f139a209149b175ef'
                                        }   
                              chai 
                                  .request(app)
                                  .post('/api/comments/create')
                                  .set({ Authorization: `Bearer ${token}` }) 
                                  .send(comment) 
                                  .end((err,response) => {   
                                      response.should.have.status(200); 
                                    done();
                                  });
                                }); 
                        }); 
            });

            it("It should get all comments", (done) => {
              chai
                .request(app)
                .get("/api/comments/all")
                .end((err, response) => {
                  response.should.have.status(200); 
                  done();
                });
            });

             it("It should get single comments", (done) => {
              const id = '6411cacab91b0a9a62b43adc'; 
              chai
                .request(app)
                .get(`/api/comments/post/${id}`)
                .end((err, response) => {
                  response.should.have.status(200); 
                  done();
                });
              });
          
           it('update comment on  new created blog', function (done) { 
              const post= {
                        snippet:"testing blog liking",
                        title: "new blog testing",
                        body: "er pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                        image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
                        published:1
                          
                        }
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                        
                          chai  
                              .request(app)
                                .post('/api/posts/create')
                                .set({ Authorization: `Bearer ${token}` }) 
                                .send(post) 
                                .end((err,response) => {   
                                response.should.have.status(200);
                            
                             const comment = { 
                                          comment:"this is new comment testing updated",
                                          post_id:  response.body.data._id,
                                          user_id: '6411b05f139a209149b175ef'
                                        }  
                              const id='6411e6152ac87bdc72de1228';
                              chai 
                                  .request(app)
                                  .put(`/api/comments/update/${id}`)
                                  .set({ Authorization: `Bearer ${token}` }) 
                                  .send(comment) 
                                  .end((err,response) => {   
                                      response.should.have.status(200); 
                                    done();
                                  });
                                }); 
                        }); 
            });

            it('delete comments', function (done) {  
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                               
                          const id='6411e731b3a58b0692b4a679';
                          chai 
                              .request(app)
                              .delete(`/api/comments/${id}`)
                              .set({ Authorization: `Bearer ${token}` })  
                              .end((err,response) => {   
                                  response.should.have.status(200); 
                                done();
                              });
                            }); 
                         
            });
          
        });


        describe ('contact us api',()=>{
          
          it('contact us',(done)=> { 
              const contact ={
                      name:"yibu",
                      email:"Yobu@gmail.com",
                      message:"This is testing message"
                    } 
              chai 
                  .request(app)
                  .post('/api/contacts/create') 
                  .send(contact) 
                  .end((err,response) => {   
                      response.should.have.status(200); 
                    done();
                  });
          }); 


           it('delete contact', function (done) {  
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                               
                          const id='6411edf6b9495a98285a21a0';

                          chai 
                              .request(app)
                              .delete(`/api/contacts/delete/${id}`)
                              .set({ Authorization: `Bearer ${token}` })  
                              .end((err,response) => {   
                                  response.should.have.status(200); 
                                done();
                              });
                            }); 
                         
            });

            it('get all contact', function (done) {  
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                                
                          chai 
                              .request(app)
                              .get(`/api/contacts/all`)
                              .set({ Authorization: `Bearer ${token}` })  
                              .end((err,response) => {   
                                  response.should.have.status(200); 
                                done();
                              });
                            }); 
                         
            });

            it('view contact', function (done) {  
                  const loguser = {
                        email: 'demo@gmail.com',
                        password: 'test'
                      };
                      
                      chai
                        .request(app)
                        .post("/api/auth/login")
                        .send(loguser)
                        .end((err, response) => {
                          response.should.have.status(200); 
                          response.body.should.have.property("token");
                          const token =response.body.token;  
                               
                          const id='6411edf6b9495a98285a21a0';
                          
                          chai 
                              .request(app)
                              .get(`/api/contacts/contact/${id}`)
                              .set({ Authorization: `Bearer ${token}` })  
                              .end((err,response) => {   
                                  response.should.have.status(200); 
                                done();
                              });
                            }); 
                         
            }); 

        });  

        describe ('get logged user api',()=>{
          it('view current user', function (done) {  
            const loguser = {
                  email: 'demo@gmail.com',
                  password: 'test'
                };
                
                chai
                  .request(app)
                  .post("/api/auth/login")
                  .send(loguser)
                  .end((err, response) => {
                    response.should.have.status(200); 
                    response.body.should.have.property("token");
                    const token =response.body.token;   
                    
                    chai 
                        .request(app)
                        .get('/api/auth/profile')
                        .set({ Authorization: `Bearer ${token}` })  
                        .end((err,response) => {   
                            response.should.have.status(200); 
                          done();
                        });
                      }); 
                         
            }); 

        });
  });  