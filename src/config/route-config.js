module.exports = {

  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const wikiRoutes = require("../routes/wiki");
    const collaboratorsRoutes = require("../routes/collaborators");
    const logger = require('morgan');
    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(wikiRoutes);
    app.use(collaboratorsRoutes);
    app.use(logger('dev'));

  }
}
