const passport = require("passport");
const userQueries = require("../db/queries.users.js");
const sgMail = require('@sendgrid/mail');
const User = require('../db/models').User;
const stripe = require("stripe")(process.env.stripeSecret);
const Wiki = require("../db/models").Wiki;
const Collaborator = require("../db/models").Collaborator;
const Authorizer = require("../policies/wiki");

module.exports = {
  signUp(req, res, next){
    res.render("users/signup");
  },

  create(req, res, next){
     let newUser = {
       email: req.body.email, //form not sending body
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation,
     };

     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/");
       } else {


         passport.authenticate("local")(req, res, () => {
           req.flash("notice", "You've successfully signed in!");
           res.redirect("/");
         })
       }
     });
   },


  signInForm(req, res, next){
     res.render("users/sign_in");
   },

   signIn(req, res, next){
     passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) {
            req.flash("notice", "Login error. Did you enter the correct username and password?")
            return res.redirect("/users/sign_in");
          }
          req.flash("notice", "Login Success!");
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
          });
        })(req, res, next);
   },

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   },

   upgrade(req, res, next){
     User.findById(req.params.id)
     .then(user => {
       res.render('users/upgrade', {user});
    })
    .catch(err => {
      req.flash("error", err);
      res.redirect("/");
    })
  },

   downgrade(req, res, next){
     res.render("users/downgrade");
   },

   downgradeForm(req, res, next){
      let newDowngrade = {
         name: req.body.name, //form not sending body
         email: req.body.email,
         description: req.body.description
       };

       Wiki.update({
        private: false }, {
        where: {
        userId: req.params.id
        }
        });

       User.findById(req.params.id)
       .then(user => {
       user.role = 0;
       user.save();

       req.flash("notice", "You are now a standard user!");
       res.redirect("/");

 })

       sgMail.setApiKey(process.env.SENDGRID_API_KEY);
       const msg = {
         to: 'emilyspieler1@gmail.com',
         from: 'test@example.com',
         subject:  'this is the subject',
         text: 'Please refund their credit card',
         html: '<strong>and easy to do anywhere, even with Node.js</strong>',
       };

          sgMail.send(msg).then( () => {
            console.log("Successfully Sent Mail!");
          })
          .catch( error => {
            console.error(error.toString());
          });

       userQueries.createDowngrade(newDowngrade, (err, user) => {
         if(err){
           req.flash("error", err);
           res.redirect("/");
         } else {
           passport.authenticate("local")(req, res, () => {
             req.flash("notice", "You've successfully Downgraded!");
             res.redirect("/");
           })
         }
       });
   },

      charge(req, res, next){
          User.findById(req.params.id)
          .then(user => {
            var stripeToken = req.body.stripeToken;

            stripe.charges.create({
              amount: 1500,
              currency: "usd",
              description: "Upgrade tp premium User",
              source: stripeToken,
            }, function(err, charge) {
              user.role = 1;
              user.save();

            req.flash("notice", "You are now a premium user!");
            res.redirect("/");
          });
        })
        .catch(err => {
          console.log(err);
          req.flash("notice", "Error upgrading.  Please try again.");
          res.redirect("/");
        });
      }


    }
