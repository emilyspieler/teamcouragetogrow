const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");
const validation = require("./validation");

const wikiController = require("../controllers/wikiController");
const userController = require("../controllers/userController");
const collaboratorController = require("../controllers/collaboratorController");

router.get("/wikis/:wikiId/collaborators/", collaboratorController.index);
router.get("/wikis/:wikiId/collaborators/new", collaboratorController.new);
router.post("/wikis/:wikiId/collaborators/create", collaboratorController.create);
router.get("/wikis/:wikiId/collaborators/:id", collaboratorController.show);
router.post("/wikis/:wikiId/collaborators/:id/destroy", collaboratorController.destroy);

module.exports = router;
