const request = require('supertest');
const app = require("../server.js"); 
const  mongoose = require("mongoose");  
require('dotenv').config(); 

describe("all API test", () => {
  /**
   * Test the all route
   */

  beforeAll(() => {
    mongoose.connect(process.env.DB_URL);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Database connection failed"));
    db.once("open", () => {
      console.log("Database connection established");
    });
  });

    /**
     * Test the user route
     */

 describe('user API test', ()=>{ 

        // can't get all users while you are not authenticated as admin
        describe('GET /api/users/all', function( ) { 
            it('it should not get all users while user is not  admin', function(done) {
                request(app)
                .get('/api/users/all')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401, done)
                
            }); 
        });

        //  get single users while you are logged  
        describe("GET /api/users/all", () => {
                it("It should return response with all users", () => {
                  const user ={ 
                            email: `demo@gmail.com`,
                            password: "test"
                            }
                    const response = request(app)
                                            .post("/api/auth/login")
                                            .send(user) 
                                            .then(response => { 
                                                response.body.should.have.property("token"); 
                                                const token = response.header.authUser;
                                      const userId='640d9cce998d4189fb3894eb';
                                    request(app).get(`/api/users/${userId}`)
                                                .set({ Authorization: `Bearer ${token}` })
                                                .set('Accept', 'application/json')
                                                .then(response => { 
                                                expect(response.statusCode).toBe(200) 
                                                }) 
                                    }); 
                });
            });
    

        // creating new user
        describe('POST /api/users/create', () => { 
            test('should create new user', function ( ) {
                const number = Math.floor(Math.random() * 10000);
                 const user = {
                                name: `${number}`,
                                email: `${number}demo@gmail.com`,
                                password: "test",
                                confirm_password: "test",
                                role: "admin"
                                }
                
                request(app)
                        .post('/api/users/create')
                        .set('Accept', 'application/json')
                        .send(user)
                        .then(response => { 
                           expect(response.statusCode).toBe(200) 
                        });
                       

            });
        });

        // user must be unique (email)
        describe('POST /api/users/create', () => { 
            test('user must be unique (email)', function ( ) { 
                 const user = {
                                name: `3602`,
                                email: `demo@gmail.com`,
                                password: "test",
                                confirm_password: "test"
                                }
                
                request(app)
                        .post('/api/users/create')
                        .set('Accept', 'application/json')
                        .send(user)
                        .then(response => { 
                           expect(response.statusCode).toBe(416) 
                        });
                       

            });
        });

        // user two password must be the same
        describe('POST /api/users/create', () => { 
            test('user two password (new password and confirm password) must be the same',  ()=>  { 
                 const user = {
                                name: `3602`,
                                email: `demo@gmail.com`,
                                password: "test",
                                confirm_password: "test_test"
                                }
                
                request(app)
                        .post('/api/users/create')
                        .set('Accept', 'application/json')
                        .send(user)
                        .then(response => { 
                           expect(response.statusCode).toBe(416) 
                        });
                       

            });
        });

        // user can not be created bcz All fields are required   
        describe('POST /api/users/create', () => { 
            test('User can not be created bcz All fields are required',   ( ) =>  { 
                 const user = {
                                name: "",
                                email: "",
                                password: " ",
                                confirm_password: " "
                                }
                
                request(app)
                        .post('/api/users/create')
                        .set('Accept', 'application/json')
                        .send(user)
                        .expect(500)
                       

            });
        }); 

        // get users list while u logged as admin
        describe("GET /api/users/all", () => {
            it("It should return response with all users", () => {
                const user ={ 
                            email: `demo@gmail.com`,
                            password: "test"
                            }
                const response =  request(app)
                                        .post("/api/auth/login")
                                        .send(user) 
                                        .then(response => { 
                                            response.body.should.have.property("token"); 
                                            const token = response.header.authUser;

                                request(app).get("/api/users/all")
                                            .set({ Authorization: `Bearer ${token}` })
                                            .set('Accept', 'application/json')
                                             .then(response => { 
                                            expect(response.statusCode).toBe(200) 
                                             }) 
                                 }); 
            });
        });

 
    });


     /**
     * Test the blog route
      */

    describe('Blog API test', ()=>{ 
        describe("GET /api/posts/all", () => {
            test("It should response which contains all blogs ", () => {
                request(app)
                .get("/api/posts/all")
                .then(response => {
                    expect(response.statusCode).toBe(200);
                });
            });
        });

        describe ('POST /api/posts/create', () =>{
            it('should  not create a new post because user must be logged in as admin', function (done) {
                
                    const post = {
                        snippet:"testing blog.",
                        title: "testing blog...",
                        body: "When the extended option is set to false, the values in the URL-encoded data will be parsed into a nested object format. For example, the URL-encoded data foo=bar&baz=qux will be parsed into the following object:   If the extended option is set to true, then the values in the URL-encoded data can be any type, and will be parsed into a flat object format. For example, the URL-encoded data foo[bar]=baz will be parsed into the following object:    By setting extended to false, we can avoid the potential security vulnerability known as parameter pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                        image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                                        };

                request(app).post('/api/posts/create')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json') 
                .send(post)
                .expect(401, done) ;
            });
        });

        describe ('POST /api/posts/create', () =>{
            it('should   create a new post with user  logged  as admin', function (done) {
                const user = {
                            email:"demo@gmail.com",
                            password:"test"
                            }

                const number = Math.floor(Math.random() * 10000);
                    const post = {
                                    snippet:"testing blog.",
                                    title: "testing blog...",
                                    body: "When the extended option is set to false, the values in the URL-encoded data will be parsed into a nested object format. For example, the URL-encoded data foo=bar&baz=qux will be parsed into the following object:   If the extended option is set to true, then the values in the URL-encoded data can be any type, and will be parsed into a flat object format. For example, the URL-encoded data foo[bar]=baz will be parsed into the following object:    By setting extended to false, we can avoid the potential security vulnerability known as parameter pollution, where malicious users can send an excessive amount of data to the server in order to cause it to crash or behave in unintended ways. ",
                                    image: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                                };

                request(app).post('/api/posts/create')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json') 
                .send(post)
                .expect(401, done) ;
            });
        });

    });



    /**
     * Test the contact route
     */

    // contact message info saved in the db
    describe('contact API test', () => {  
    //    contact message  info not saved because no data provided
        describe('Contact API test POST /api/contacts/create', ()=>{ 
            test('should return 500 bcz no data provided', async () => {
                const response = await request(app).post('/api/contacts/create');
                expect(response.status).toBe(500); 
                expect(response.body.message).toBe('Error saving contact');
            }); 
        });
    });













}); 