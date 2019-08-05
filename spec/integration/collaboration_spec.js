const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/collaborations/";
const User = require("../../src/db/models").User;
const Collaboration = require("../../src/db/models").Collaboration;
const Wiki = require("../../src/db/models").Wiki;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes: collaborations", () => {

  beforeEach((done) => {
       this.wiki;
       this.collaboration;
       this.user;

       sequelize.sync({force: true}).then((res) => {

         User.create({
           email: "starman@tesla.com",
           password: "Trekkie4lyfe"
         })
         .then((user) => {
           this.user = user; //store the user

           Wiki.create({
             title: "Expeditions to Alpha Centauri",
             description: "A compilation of reports from recent visits to the star system.",
             posts: [{
               title: "My first visit to Proxima Centauri b",
               body: "I saw some rocks.",
               userId: this.user.id
             }]
           }, {
             include: {
               model: Collaboration,
               as: "collaborations"
             }
           })
           .then((wiki) => {
             this.wiki = wiki; //store the topic
             this.collaboration = wiki.collaboration[0]; //store the post
             done();
           })
         })
       });
     });

  describe("#create()", () => {

     it("should create a collaboration object with an email and assigned user", (done) => {
//#1
       Collaboration.create({
         email: "standard@standard.com"
       })
       .then((post) => {

//#2
         expect(collaboration.email).toBe("standard@standard.com");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

   it("should not create a collaboration with missing email", (done) => {
     Collaboration.create({
       email: "standard@standard.com"
     })
     .then((post) => {

      // the code in this block will not be evaluated since the validation error
      // will skip it. Instead, we'll catch the error in the catch block below
      // and set the expectations there

       done();

     })
     .catch((err) => {

       expect(err.message).toContain("Collaborations.body cannot be null");
       expect(err.message).toContain("Collaborations.wikiId cannot be null");
       done();

     })
   });

   describe("#setWiki()", () => {

        it("should associate a wiki and a collaboration together", (done) => {

   // #1
          Wiki.create({
            title: "Challenges of interstellar travel",
            description: "1. The Wi-Fi is terrible"
          })
          .then((post) => {

   // #2
            expect(this.collaboration.wikiId).toBe(this.wiki.id);
   // #3
            this.collaboration.setWiki(newWiki)
            .then((post) => {
   // #4
              expect(this.collaboration.wikiId).toBe(newWiki.id);
              done();

            });
          })
        });

      });
});
