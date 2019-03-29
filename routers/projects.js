const express = require("express");
const db = require("../data/dbHelpers");
const router = express.Router();
const helpers = require("./helpers");

const prettifyArray = helpers.prettifyArray;
const prettifyProjectWithActions = helpers.prettifyProjectWithActions;

router
  .route("/")
  .get(async (req, res) => {
    try {
      const projects = await db.findProjects();
      // show true/false rather than 0 1
      const prettyProjects = prettifyArray(projects);
      res.status(200).json(prettyProjects);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry we couldn't get the projects at this time" });
    }
  })
  .post(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description)
      return res
        .status(400)
        .json({ error: "Your new project must have a name and description" });
    try {
      const newProjectId = await db.addProject(req.body);
      const newProject = await db.findProjectById(newProjectId[0]);
      const prettierProject = prettifyProjectWithActions(newProject);
      res.status(201).json(prettierProject);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry we couldn't add a project at this time" });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const rawProject = await db.findProjectById(req.params.id);
      const project = prettifyProjectWithActions(rawProject);
      res.status(200).json(project);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry we couldn't get that project right now" });
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await db.deleteProject(req.params.id);
      if (deleted === 0)
        return res
          .status(404)
          .json({ error: "There is no project at that id to delete" });
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json({ error: "We couldn't delete a project right now" });
    }
  });

module.exports = router;
