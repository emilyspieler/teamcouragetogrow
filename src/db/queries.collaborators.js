const User = require("./models").User;
const Collaborator = require("./models").Collaborator;
const bcrypt = require("bcryptjs");
const Wiki = require("./models").Wiki;

module.exports = {

  getAllCollaborators(callback){
    return Collaborator.all()
    .then((collaborators) => {
      callback(null, collaborators);
    })
    .catch((err) => {
      callback(err);
    })
  },


  addCollaborator(newCollaborator, callback) {
      return Collaborator.create(newCollaborator)
      .then((Collaborator) => {
        callback(null, Collaborator);
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

deleteCollaborator(id, callback){
     return Collaborator.destroy({
       where: { id }
     })
     .then((collaborator) => {
       callback(null, collaborator);
     })
     .catch((err) => {
       callback(err);
     })
   },

}
