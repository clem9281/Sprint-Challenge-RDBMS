const express = require("express");
const db = require("../data/dbHelpers");
const router = express.Router();

const prettifyArray = objArr => {
  return objArr.map(el => ({
    ...el,
    completed: el.completed === 1 ? true : false
  }));
};

const prettifyObject = obj => {
  return { ...obj, completed: obj.completed === 1 ? true : false };
};

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
      const newProject = await db.findProjectById(newProjectId[0]).first();
      const prettierProject = prettifyObject(newProject);
      res.status(201).json(prettierProject);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry we couldn't add a project at this time" });
    }
  });

module.exports = router;
