const Wiki = require("./models").Wiki;
const Authorizer = require("../policies/wiki");
const Collaborator = require("./models").Collaborator;
const User = require("./models").User;

module.exports = {

  getAllWikis(callback) {
      return Wiki.all({
        include: [
          {
            model: Collaborator,
            as: "collaborators"
          }    
        ]
      })
        .then(wikis => {
          callback(null, wikis);
        })
        .catch(err => {
          callback(err);
        });
    },

  addWiki(options, callback){
      return Wiki.create({
        title: options.title,
        description: options.description,
        private: options.private,
        userId: options.userId
      })
      .then((wiki) => {
        callback(null, wiki);
      })
      .catch((err) => {
        callback(err);
      })
    },

    getWiki(id, callback){
       return Wiki.findById(id)
       .then((wiki) => {
         callback(null, wiki);
       })
       .catch((err) => {
         callback(err);
       })
     },

     getCollaborator(id, callback){
        return Collaborator.findById(id)
        .then((collaborator) => {
          callback(null, collaborator);
        })
        .catch((err) => {
          callback(err);
        })
      },

     deleteWiki(req, callback){

        return Wiki.findById(req.params.id)
        .then((wiki) => {


          const authorized = new Authorizer(req.user, wiki).destroy();

          if(authorized) {

            wiki.destroy()
            .then((res) => {
              callback(null, wiki);
            });

          } else {

            req.flash("notice", "You are not authorized to do that.")
            callback(401);
          }
        })
        .catch((err) => {
          callback(err);
        });
      },

      updateWiki(req, updatedWiki, callback){

          return Wiki.findById(req.params.id)
            .then((wiki) => {

            if(!wiki){
            return callback("Wiki not found");
            }

        const authorized = new Authorizer(req.user, wiki).update();


          if(authorized) {

            wiki.update(updatedWiki, {
              fields: Object.keys(updatedWiki)
            })
            .then(() => {
              callback(null, wiki);
            })
            .catch((err) => {
              callback(err);
            });
          } else {

            req.flash("notice", "You are not authorized to do that.");
            callback("Forbidden");
          }
        });
      },

  }
