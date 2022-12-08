const express = require("express");
const router = express.Router();

const journalsCtrl = require("../../controllers/api/journals");

router.post("/new", journalsCtrl.createEntry);
router.get("/:id", journalsCtrl.display);
router.delete("/:id", journalsCtrl.deleteJournal);
router.put("/:id", journalsCtrl.updateEntry);

module.exports = router;
