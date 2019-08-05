const wikiQueries = require("../db/queries.wikis.js");
const userQueries = require("../db/queries.users.js");
const collaboratorQueries = require("../db/queries.collaborators.js");
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;
const Wiki = require("../db/models").Wiki;
const User = require("../db/models").User;
const Collaborator = require("../db/models").Collaborator;

module.exports = {
  index(req, res, next){
    collaboratorQueries.getAllCollaborators((err, collaborators) => {
        if(err){
          res.redirect(500, "/");
        } else {
          res.render("collaborators/index", {...result});
        }
      })
  },

  new(req, res, next){

  const authorized = new Authorizer(req.user).new();

     if(authorized) {
       res.render("collaborators/new", {wikiId: req.params.wikiId});

    } else {
       req.flash("notice", "You are not authorized to do that.");
       res.redirect(`/wikis/${wiki.Id}/collaborators/${collaborator.id}`);
     }
  },

  create(req, res, next){
    //verifies that collaborator is actually a user already registered.
    User.findOne({where: {email: req.body.email}})
       .then(user => {

      if (user) {
       let newCollaborator= {
         email: req.body.email,
         userId: req.user.id,
         wikiId: req.params.wikiId,
       };

//Collaborator.update({role: 1}, { where: {wikiId: req.params.wikiId}, individualHooks: true});

       collaboratorQueries.addCollaborator(newCollaborator, (err, collaborator) => {
         if(err){
           res.redirect(500, "/collaborators/new");
         } else {
           res.render("collaborators/show",
             {collaborator});
           }
       });
         } else {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/wikis");
        }
      })

     },

  show(req, res, next){
       collaboratorQueries.getCollaborator(req.params.id, (err, collaborator) => {
         if(err || collaborator == null){
          console.log(err)
      res.redirect(404, "/");
    } else {
      res.render("collaborators/show", {collaborator});
    }
  });
},

destroy(req, res, next){

 collaboratorQueries.deleteCollaborator(req.params.id, (err, collaborator) => {
   if(err){
     res.redirect(err, `/wikis/${req.params.wikiId}/collaborators/${req.params.id}`)
   } else {
     res.redirect(303, `/wikis/${req.params.wikiId}/collaborators/`)
   }
 });
},

}
